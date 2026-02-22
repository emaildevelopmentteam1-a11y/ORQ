import clsx from "clsx";
import type { ReactNode } from "react";

interface TableRowProps {
    cells: ReactNode[];
    onClick?: () => void;
    highlight?: boolean;
    className?: string;
}

export function TableRow({ cells, onClick, highlight, className }: TableRowProps) {
    return (
        <tr
            onClick={onClick}
            className={clsx(
                "border-b border-border transition-colors duration-150",
                onClick && "cursor-pointer",
                highlight ? "bg-primary-light/50" : "hover:bg-muted/30",
                className
            )}
        >
            {cells.map((cell, i) => (
                <td key={i} className="px-6 py-4 text-sm text-foreground">
                    {cell}
                </td>
            ))}
        </tr>
    );
}

/* Tabla contenedora auxiliar */
interface TableProps {
    headers: string[];
    children: ReactNode;
    title?: string;
    actions?: ReactNode;
    className?: string;
}

export function Table({ headers, children, title, actions, className }: TableProps) {
    return (
        <div className={clsx("bg-surface rounded-xl border border-border overflow-hidden", className)}>
            {(title || actions) && (
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                    {title && (
                        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    )}
                    {actions && (
                        <div className="flex items-center gap-2">{actions}</div>
                    )}
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-muted/40">
                            {headers.map((h) => (
                                <th
                                    key={h}
                                    className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export type { TableRowProps, TableProps };
