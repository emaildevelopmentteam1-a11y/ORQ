import clsx from "clsx";
import type { ReactNode } from "react";

type BadgeVariant = "info" | "success" | "warning" | "error" | "neutral";

interface BadgeProps {
    variant?: BadgeVariant;
    children: ReactNode;
    className?: string;
    dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
    info: "bg-primary-light text-primary ring-1 ring-primary/20",
    success: "bg-accent-green-light text-accent-green ring-1 ring-accent-green/20",
    warning: "bg-accent-amber-light text-accent-amber ring-1 ring-accent-amber/20",
    error: "bg-accent-red-light text-accent-red ring-1 ring-accent-red/20",
    neutral: "bg-muted text-muted-foreground ring-1 ring-border",
};

const dotColors: Record<BadgeVariant, string> = {
    info: "bg-primary",
    success: "bg-accent-green",
    warning: "bg-accent-amber",
    error: "bg-accent-red",
    neutral: "bg-muted-foreground",
};

export function Badge({ variant = "info", children, className, dot = false }: BadgeProps) {
    return (
        <span
            className={clsx(
                "inline-flex items-center gap-1.5 rounded-full text-xs font-medium px-2.5 py-0.5",
                variantStyles[variant],
                className
            )}
        >
            {dot && (
                <span className={clsx("size-1.5 rounded-full", dotColors[variant])} />
            )}
            {children}
        </span>
    );
}

export type { BadgeProps, BadgeVariant };
