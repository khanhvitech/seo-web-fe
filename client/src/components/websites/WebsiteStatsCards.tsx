import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HealthStats } from "@/types/website";

interface WebsiteStatsCardsProps {
  stats: HealthStats;
}

export function WebsiteStatsCards({ stats }: WebsiteStatsCardsProps) {
  const getHealthPercentage = (count: number) => ((count / stats.total) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Active/Healthy Sites */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">Active</p>
              <p className="text-2xl font-bold text-green-900">{stats.healthy}</p>
              <p className="text-xs text-green-600">websites</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {getHealthPercentage(stats.healthy)}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Warning Sites */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">⚠️ Warning</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.warning}</p>
              <p className="text-xs text-yellow-600">websites</p>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              {getHealthPercentage(stats.warning)}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Critical Sites */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">🔴 Critical</p>
              <p className="text-2xl font-bold text-red-900">{stats.critical}</p>
              <p className="text-xs text-red-600">websites</p>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              {getHealthPercentage(stats.critical)}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Total Sites */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-800">📊 Total Sites</p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              <p className="text-xs text-blue-600">websites</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
