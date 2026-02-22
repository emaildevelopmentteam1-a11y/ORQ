import { type ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "outline" | "dark" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-primary text-white hover:bg-primary-hover shadow-sm",
    outline:
        "bg-transparent border border-primary text-primary hover:bg-primary-light",
    dark:
        "bg-cta-dark text-white hover:opacity-90",
    ghost:
        "bg-transparent text-text-secondary hover:bg-primary-light hover:text-primary",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", size = "md", className, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled}
                className={clsx(
                    "inline-flex items-center justify-center gap-2 font-medium rounded-button transition-all duration-200 cursor-pointer",
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
