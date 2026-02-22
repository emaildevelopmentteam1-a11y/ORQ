import { Badge } from "./Badge";
import { Button } from "./Button";
import * as Icons from "lucide-react";

type ExtensionStatus = "available" | "active" | "coming-soon";

interface ExtensionCardProps {
    name: string;
    description: string;
    iconName: string;
    status: ExtensionStatus;
    category: string;
    onToggle?: () => void;
}

const statusConfig: Record<ExtensionStatus, { label: string; variant: "success" | "info" | "neutral"; dot: boolean }> = {
    available: { label: "Disponible", variant: "success", dot: true },
    active: { label: "Activa", variant: "success", dot: true },
    "coming-soon": { label: "Próximamente", variant: "neutral", dot: false },
};

function getIcon(name: string): React.ComponentType<{ className?: string }> {
    const pascalName = name.replace(/(^|-)(\\w)/g, (_, __, c: string) => c.toUpperCase());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const icon = (Icons as Record<string, any>)[pascalName];
    return icon || Icons.Package;
}

export function ExtensionCard({
    name,
    description,
    iconName,
    status,
    category,
    onToggle,
}: ExtensionCardProps) {
    const Icon = getIcon(iconName);
    const config = statusConfig[status];

    return (
        <div className="bg-surface rounded-xl border border-border p-5 flex flex-col shadow-card transition-shadow duration-200 hover:shadow-card-hover">
            <div className="flex items-start gap-3 mb-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-semibold text-foreground truncate">{name}</h3>
                        <Badge variant={config.variant} dot={config.dot}>{config.label}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{category}</p>
                </div>
            </div>
            <p className="text-sm text-text-secondary mb-4 flex-1 leading-relaxed">{description}</p>
            {status !== "coming-soon" && (
                <Button
                    variant={status === "active" ? "secondary" : "dark"}
                    size="sm"
                    onClick={onToggle}
                    className="w-full"
                >
                    {status === "active" ? "Desactivar" : "Activar"}
                </Button>
            )}
            {status === "coming-soon" && (
                <Button variant="ghost" size="sm" disabled className="w-full">
                    Próximamente
                </Button>
            )}
        </div>
    );
}

export type { ExtensionCardProps, ExtensionStatus };
