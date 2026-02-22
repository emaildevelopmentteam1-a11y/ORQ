"use client";

import { useState } from "react";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import clsx from "clsx";
import type { ReactNode } from "react";

interface TreeItemProps {
    label: string;
    children?: ReactNode;
    level?: number;
    icon?: ReactNode;
    defaultOpen?: boolean;
    onClick?: () => void;
    trailing?: ReactNode;
}

export function TreeItem({
    label,
    children,
    level = 0,
    icon,
    defaultOpen = false,
    onClick,
    trailing,
}: TreeItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const hasChildren = !!children;

    const handleToggle = () => {
        if (hasChildren) setIsOpen(!isOpen);
        onClick?.();
    };

    return (
        <div>
            <button
                onClick={handleToggle}
                className={clsx(
                    "w-full flex items-center gap-2 px-4 py-3 text-sm text-foreground transition-colors duration-150",
                    "hover:bg-muted/30 cursor-pointer",
                    level === 0 && "border-b border-border"
                )}
                style={{ paddingLeft: `${16 + level * 24}px` }}
            >
                {/* Indicador expandible */}
                <span className="size-4 flex items-center justify-center text-muted-foreground shrink-0">
                    {hasChildren ? (
                        <ChevronRight
                            className={clsx(
                                "size-4 transition-transform duration-200",
                                isOpen && "rotate-90"
                            )}
                        />
                    ) : (
                        <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                    )}
                </span>

                {/* Icono */}
                <span className="text-primary shrink-0">
                    {icon || (hasChildren ? (isOpen ? <FolderOpen className="size-4" /> : <Folder className="size-4" />) : null)}
                </span>

                {/* Label */}
                <span className="flex-1 text-left truncate font-medium">{label}</span>

                {/* Trailing (badges, contadores) */}
                {trailing && <span className="shrink-0 text-xs text-muted-foreground">{trailing}</span>}
            </button>

            {/* Hijos */}
            {hasChildren && isOpen && (
                <div>{children}</div>
            )}
        </div>
    );
}

export type { TreeItemProps };
