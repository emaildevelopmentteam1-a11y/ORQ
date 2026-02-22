import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ icon, label, error, className, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="space-y-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-text-primary"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                            {icon}
                        </span>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={clsx(
                            "w-full rounded-input border border-border bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted",
                            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                            "transition-colors duration-200",
                            icon && "pl-10",
                            error && "border-accent-red focus:ring-accent-red/20 focus:border-accent-red",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-xs text-accent-red">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input, type InputProps };
