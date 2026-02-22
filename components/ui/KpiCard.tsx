import { Card } from "./Card";
import { Badge } from "./Badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import clsx from "clsx";

type KpiTrend = "up" | "down" | "neutral";

interface KpiCardProps {
    title: string;
    value: string | number;
    change?: string;
    trend?: KpiTrend;
    icon?: React.ReactNode;
}

const trendConfig: Record<KpiTrend, { icon: React.ReactNode; variant: "success" | "error" | "neutral" }> = {
    up: { icon: <TrendingUp size={14} />, variant: "success" },
    down: { icon: <TrendingDown size={14} />, variant: "error" },
    neutral: { icon: <Minus size={14} />, variant: "neutral" },
};

export function KpiCard({ title, value, change, trend = "neutral", icon }: KpiCardProps) {
    const trendInfo = trendConfig[trend];

    return (
        <Card hover>
            <div className="flex items-start justify-between mb-3">
                <span className="text-sm text-text-secondary">{title}</span>
                {icon && (
                    <span className="text-primary">{icon}</span>
                )}
            </div>
            <p className={clsx("text-2xl font-bold text-text-primary mb-1")}>
                {value}
            </p>
            {change && (
                <div className="flex items-center gap-1.5">
                    <Badge variant={trendInfo.variant}>
                        <span className="flex items-center gap-1">
                            {trendInfo.icon}
                            {change}
                        </span>
                    </Badge>
                </div>
            )}
        </Card>
    );
}

export type { KpiCardProps, KpiTrend };
