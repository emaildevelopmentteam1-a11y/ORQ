import clsx from "clsx";
import type { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    hover?: boolean;
    padding?: boolean;
}

export function Card({
    children,
    hover = false,
    padding = true,
    className,
    ...props
}: CardProps) {
    return (
        <div
            className={clsx(
                "bg-surface rounded-card border border-border shadow-card",
                hover && "transition-shadow duration-200 hover:shadow-card-hover",
                padding && "p-6",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export type { CardProps };
