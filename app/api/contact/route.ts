import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  organizacion: z.string().min(2, "La organización debe tener al menos 2 caracteres"),
  rol: z.string().min(2, "El cargo o rol debe tener al menos 2 caracteres"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  telefono: z.string().optional(),
  tamano: z.string().optional(),
  interes: z.string().optional(),
  detalles_demo: z.string().optional(),
  type: z.enum(["contact_request", "demo_request"]).optional(),
  website: z.string().optional(),
  honeypot: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Anti-spam básico (Honeypot) - AC-011
    if (body.honeypot || body.website) {
      // Si el honeypot está lleno, es un bot. Retornamos success falso para engañarlo.
      return NextResponse.json({ success: true, message: "Mensaje recibido" }, { status: 200 });
    }

    // 2. Validación de datos en backend (zod) - AC-008
    const parsedData = contactSchema.parse(body);

    // Verificamos que la API key exista
    if (!process.env.RESEND_API_KEY) {
      console.error("Falta RESEND_API_KEY en variables de entorno");
      return NextResponse.json(
        { message: "Error de configuración de servidor" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const destinationEmail = process.env.CONTACT_EMAIL_DESTINATION || "hola@orquestra.com";

    // 3. Email interno para el equipo comercial (AC-002, AC-014)
    const internalEmail = await resend.emails.send({
      from: "Prisma Notificaciones <onboarding@resend.dev>", // Cambiar por dominio real en prod
      to: [destinationEmail],
      subject: `[📥 NUEVO CONTACTO GENERAL] ${parsedData.organizacion} - ${parsedData.nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; max-width: 600px;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">📥 Consulta de Contacto General</h2>
          <p>Se ha recibido un nuevo mensaje a través del <strong>formulario corporativo de Contacto</strong> (No es Demo).</p>
          <hr style="border-color: #e2e8f0;" />
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong>Tipo de Solicitud:</strong> Contacto General</li>
            <li style="margin-bottom: 10px;"><strong>Nombre:</strong> ${parsedData.nombre}</li>
            <li style="margin-bottom: 10px;"><strong>Empresa:</strong> ${parsedData.organizacion}</li>
            <li style="margin-bottom: 10px;"><strong>Rol:</strong> ${parsedData.rol}</li>
            <li style="margin-bottom: 10px;"><strong>Email:</strong> ${parsedData.email}</li>
            ${parsedData.telefono ? `<li style="margin-bottom: 10px;"><strong>Teléfono:</strong> ${parsedData.telefono}</li>` : ''}
            ${parsedData.tamano ? `<li style="margin-bottom: 10px;"><strong>Tamaño Empresa:</strong> ${parsedData.tamano}</li>` : ''}
            ${parsedData.interes ? `<li style="margin-bottom: 10px;"><strong>Interés Principal:</strong> ${parsedData.interes}</li>` : ''}
          </ul>
          <h3 style="margin-top: 20px;">Mensaje:</h3>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
            ${parsedData.mensaje}
          </div>
          <br/>
          <p style="font-size: 12px; color: #64748b;">Notificación automática de Prisma Landing Page</p>
        </div>
      `,
    });

    if (internalEmail.error) {
      throw new Error(internalEmail.error.message);
    }

    // 4. Correo automático de confirmación al usuario (AC-006, AC-007, AC-013)
    await resend.emails.send({
      from: "Prisma <onboarding@resend.dev>", // Cambiar por dominio corporativo
      to: [parsedData.email],
      subject: "Hemos recibido tu consulta - Prisma",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 40px 20px; color: #1e293b; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563EB; margin: 0; font-size: 24px;">Prisma</h1>
          </div>
          <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 30px;">
            <h2 style="color: #0f172a; margin-top: 0;">Hola, ${parsedData.nombre}:</h2>
            <p style="line-height: 1.6; color: #475569;">
              Hemos recibido tu consulta correctamente. Nuestro equipo revisará la información de tu organización (<strong>${parsedData.organizacion}</strong>) y nos pondremos en contacto contigo a la mayor brevedad.
            </p>
            <p style="line-height: 1.6; color: #475569;">
              El tiempo estimado de respuesta es de menos de 24 horas laborables.
            </p>
            <br/>
            <p style="color: #0f172a; font-weight: bold; margin-bottom: 5px;">El equipo de Prisma</p>
            <p style="color: #64748b; font-size: 14px; margin-top: 0;">Soluciones Enterprise</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Datos de formulario inválidos", errors: error.flatten().fieldErrors }, { status: 400 });
    }
    console.error("Error procesando contacto:", error);
    return NextResponse.json({ message: "Error interno procesando la solicitud" }, { status: 500 });
  }
}
