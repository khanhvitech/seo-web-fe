import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

export function StatsCard({ title, value, icon: Icon, change, changeType }: StatsCardProps) {
  return (
    <Card data-testid={`card-stats-${title.toLowerCase()}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-2" data-testid={`text-value-${title.toLowerCase()}`}>{value}</p>
            {change && (
              <p className={`text-xs mt-2 ${changeType === 'increase' ? 'text-chart-2' : 'text-destructive'}`}>
                {changeType === 'increase' ? '↑' : '↓'} {change}
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
