import { type ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "dark" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
    secondary:
        "bg-transparent border border-border text-foreground hover:bg-muted",
    dark:
        "bg-cta-dark text-white hover:opacity-90",
    ghost:
        "text-text-secondary hover:bg-muted hover:text-foreground",
    danger:
        "bg-accent-red text-white hover:bg-accent-red/90",
    outline:
        "bg-transparent border border-primary text-primary hover:bg-primary-light",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "text-xs px-3 py-1.5 h-8",
    md: "text-sm px-4 py-2 h-9",
    lg: "text-sm px-5 py-2.5 h-10",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", size = "md", className, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled}
                className={clsx(
                    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                    variantStyles[variant],
                    sizeStyles[size],
                    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant };
