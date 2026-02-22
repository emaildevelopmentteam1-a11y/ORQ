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
                highlight ? "bg-primary-light/50" : "hover:bg-bg",
                className
            )}
        >
            {cells.map((cell, i) => (
                <td key={i} className="px-4 py-3 text-sm text-text-primary">
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
    className?: string;
}

export function Table({ headers, children, className }: TableProps) {
    return (
        <div className={clsx("overflow-x-auto rounded-card border border-border bg-surface", className)}>
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-border bg-bg">
                        {headers.map((h) => (
                            <th key={h} className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
}

export type { TableRowProps, TableProps };
