"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
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
                    "w-full flex items-center gap-2 px-3 py-2 text-sm text-text-primary rounded-button transition-colors duration-150",
                    "hover:bg-primary-light cursor-pointer",
                )}
                style={{ paddingLeft: `${12 + level * 20}px` }}
            >
                {/* Indicador expandible */}
                <span className="w-4 h-4 flex items-center justify-center text-text-muted shrink-0">
                    {hasChildren ? (
                        isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
                    )}
                </span>

                {/* Icono */}
                <span className="text-primary shrink-0">
                    {icon || (hasChildren ? (isOpen ? <FolderOpen size={16} /> : <Folder size={16} />) : null)}
                </span>

                {/* Label */}
                <span className="flex-1 text-left truncate">{label}</span>

                {/* Trailing (badges, acciones) */}
                {trailing && <span className="shrink-0">{trailing}</span>}
            </button>

            {/* Hijos */}
            {hasChildren && isOpen && (
                <div className="animate-in slide-in-from-top-1 duration-200">
                    {children}
                </div>
            )}
        </div>
    );
}

export type { TreeItemProps };
