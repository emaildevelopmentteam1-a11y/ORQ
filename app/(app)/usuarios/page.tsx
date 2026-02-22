import {
    Plus,
    Search,
    MoreHorizontal,
    Shield,
    ShieldCheck,
    UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

/* ── Datos mock de usuarios ── */
interface UserData {
    id: string;
    name: string;
    email: string;
    role: "directivo" | "responsable_area" | "colaborador";
    area: string;
    status: "active" | "inactive";
    lastLogin: string;
}

const users: UserData[] = [
    { id: "u1", name: "Carlos Mendoza", email: "carlos@empresa.com", role: "directivo", area: "Dirección General", status: "active", lastLogin: "Hace 2 min" },
    { id: "u2", name: "Ana García", email: "ana@empresa.com", role: "responsable_area", area: "Operaciones", status: "active", lastLogin: "Hace 15 min" },
    { id: "u3", name: "Roberto Díaz", email: "roberto@empresa.com", role: "responsable_area", area: "Comercial", status: "active", lastLogin: "Hace 1 h" },
    { id: "u4", name: "Laura Morales", email: "laura@empresa.com", role: "responsable_area", area: "Administración", status: "active", lastLogin: "Hoy, 09:30" },
    { id: "u5", name: "Diego Ramírez", email: "diego@empresa.com", role: "responsable_area", area: "Tecnología", status: "active", lastLogin: "Hace 30 min" },
    { id: "u6", name: "Patricia Ruiz", email: "patricia@empresa.com", role: "colaborador", area: "Ventas", status: "active", lastLogin: "Ayer" },
    { id: "u7", name: "Jorge Herrera", email: "jorge@empresa.com", role: "colaborador", area: "Marketing", status: "inactive", lastLogin: "Hace 5 días" },
    { id: "u8", name: "Sandra Vega", email: "sandra@empresa.com", role: "colaborador", area: "Recursos Humanos", status: "active", lastLogin: "Hoy, 08:15" },
];

const roleConfig = {
    directivo: { label: "Directivo", variant: "info" as const, icon: ShieldCheck },
    responsable_area: { label: "Resp. Área", variant: "warning" as const, icon: Shield },
    colaborador: { label: "Colaborador", variant: "neutral" as const, icon: UserCircle },
};

/* ── Página ── */
export default function UsuariosPage() {
    const totalActive = users.filter((u) => u.status === "active").length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">
                        Usuarios
                    </h1>
                    <p className="text-sm text-text-secondary">
                        {users.length} usuarios · {totalActive} activos
                    </p>
                </div>
                <Button size="md">
                    <Plus className="size-4" />
                    Nuevo usuario
                </Button>
            </div>

            {/* Búsqueda */}
            <Input
                icon={<Search className="size-4" />}
                placeholder="Buscar por nombre, email o área..."
            />

            {/* Tabla de usuarios */}
            <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/40">
                                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Usuario
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Rol
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Área
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Último acceso
                                </th>
                                <th className="px-5 py-3 w-12" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.map((user) => {
                                const role = roleConfig[user.role];
                                const RoleIcon = role.icon;
                                return (
                                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs shrink-0">
                                                    {user.name.split(" ").map(n => n[0]).join("")}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-medium text-foreground truncate">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-1.5">
                                                <RoleIcon className="size-3.5 text-muted-foreground" />
                                                <Badge variant={role.variant}>{role.label}</Badge>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-foreground">
                                            {user.area}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <Badge
                                                variant={user.status === "active" ? "success" : "neutral"}
                                                dot
                                            >
                                                {user.status === "active" ? "Activo" : "Inactivo"}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground">
                                            {user.lastLogin}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <button className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                                                <MoreHorizontal className="size-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
