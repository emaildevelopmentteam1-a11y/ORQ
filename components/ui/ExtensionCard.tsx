import { Card } from "./Card";
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

const statusConfig: Record<ExtensionStatus, { label: string; variant: "info" | "success" | "neutral" }> = {
    available: { label: "Disponible", variant: "info" },
    active: { label: "Activa", variant: "success" },
    "coming-soon": { label: "Próximamente", variant: "neutral" },
};

function getIcon(name: string): React.ComponentType<{ size?: number }> {
    const pascalName = name.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());
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
        <Card hover className="flex flex-col">
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-button bg-primary-light flex items-center justify-center text-primary shrink-0">
                    <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-text-primary truncate">{name}</h3>
                        <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                    <p className="text-xs text-text-muted">{category}</p>
                </div>
            </div>
            <p className="text-sm text-text-secondary mb-4 flex-1">{description}</p>
            {status !== "coming-soon" && (
                <Button
                    variant={status === "active" ? "outline" : "primary"}
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
        </Card>
    );
}

export type { ExtensionCardProps, ExtensionStatus };
