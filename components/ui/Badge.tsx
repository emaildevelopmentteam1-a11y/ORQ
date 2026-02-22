import clsx from "clsx";
import type { ReactNode } from "react";

type BadgeVariant = "info" | "success" | "warning" | "error" | "neutral";

interface BadgeProps {
    variant?: BadgeVariant;
    children: ReactNode;
    className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    info: "bg-primary-light text-primary",
    success: "bg-accent-green-light text-accent-green",
    warning: "bg-accent-amber-light text-accent-amber",
    error: "bg-accent-red-light text-accent-red",
    neutral: "bg-gray-100 text-text-secondary",
};

export function Badge({ variant = "info", children, className }: BadgeProps) {
    return (
        <span
            className={clsx(
                "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-pill",
                variantStyles[variant],
                className
            )}
        >
            {children}
        </span>
    );
}

export type { BadgeProps, BadgeVariant };
