import clsx from "clsx";
import type { ReactNode } from "react";

interface KpiCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    detail?: ReactNode;
    icon?: ReactNode;
    valueClassName?: string;
}

export function KpiCard({
    title,
    value,
    subtitle,
    detail,
    icon,
    valueClassName,
}: KpiCardProps) {
    return (
        <div className="bg-surface rounded-xl border border-border p-5 space-y-3 shadow-card">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {title}
                </span>
                {icon && (
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        {icon}
                    </div>
                )}
            </div>
            <div>
                <p className={clsx("text-3xl font-bold text-foreground", valueClassName)}>
                    {value}
                </p>
                {subtitle && (
                    <p className="text-sm text-text-secondary mt-0.5">{subtitle}</p>
                )}
            </div>
            {detail && (
                <div className="flex items-center gap-1.5 text-xs">
                    {detail}
                </div>
            )}
        </div>
    );
}

export type { KpiCardProps };
