import { useState } from "react";
import { Website, HealthStats } from "@/types/website";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw, Activity, Clock, Zap } from "lucide-react";

interface HealthMonitoringProps {
  websites: Website[];
  stats: HealthStats;
  onHealthCheck: () => void;
}

export function HealthMonitoring({ websites, stats, onHealthCheck }: HealthMonitoringProps) {
  const [autoCheckInterval, setAutoCheckInterval] = useState("1h");

  const getStatusColor = (healthStatus: string) => {
    switch (healthStatus) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (healthStatus: string) => {
    switch (healthStatus) {
      case 'healthy':
        return '🟢';
      case 'warning':
        return '🟡';
      case 'critical':
        return '🔴';
      default:
        return '⚫';
    }
  };

  const healthPercentages = {
    healthy: ((stats.healthy / stats.total) * 100).toFixed(1),
    warning: ((stats.warning / stats.total) * 100).toFixed(1),
    critical: ((stats.critical / stats.total) * 100).toFixed(1),
  };

  return (
    <div className="space-y-6">
      {/* Header với controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">🔍 Giám sát Sức khỏe</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Auto check:</span>
            <Select value={autoCheckInterval} onValueChange={setAutoCheckInterval}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15m">Mỗi 15 phút</SelectItem>
                <SelectItem value="30m">Mỗi 30 phút</SelectItem>
                <SelectItem value="1h">Mỗi 1 giờ</SelectItem>
                <SelectItem value="6h">Mỗi 6 giờ</SelectItem>
                <SelectItem value="24h">Mỗi 24 giờ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onHealthCheck}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Check tất cả ngay
          </Button>
        </div>
      </div>

      {/* Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Healthy */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-600">🟢 Healthy</span>
                <span className="text-2xl font-bold text-green-600">{stats.healthy}</span>
              </div>
              <Progress value={parseFloat(healthPercentages.healthy)} className="h-3" />
              <p className="text-xs text-muted-foreground">{healthPercentages.healthy}%</p>
            </div>

            {/* Warning */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-yellow-600">🟡 Warning</span>
                <span className="text-2xl font-bold text-yellow-600">{stats.warning}</span>
              </div>
              <Progress value={parseFloat(healthPercentages.warning)} className="h-3" />
              <p className="text-xs text-muted-foreground">{healthPercentages.warning}%</p>
            </div>

            {/* Critical */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-red-600">🔴 Critical</span>
                <span className="text-2xl font-bold text-red-600">{stats.critical}</span>
              </div>
              <Progress value={parseFloat(healthPercentages.critical)} className="h-3" />
              <p className="text-xs text-muted-foreground">{healthPercentages.critical}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Status Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Real-time Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Website</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uptime</TableHead>
                <TableHead>Response</TableHead>
                <TableHead>Last Check</TableHead>
                <TableHead>SSL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {websites.map((website) => (
                <TableRow key={website.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span>{getStatusIcon(website.health_status)}</span>
                      <div>
                        <div className="font-medium">{website.name}</div>
                        <div className="text-sm text-muted-foreground">{website.url}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={website.health_status === 'healthy' ? 'default' : 
                              website.health_status === 'warning' ? 'secondary' : 'destructive'}
                      className={getStatusColor(website.health_status)}
                    >
                      {website.health_status === 'healthy' ? 'Healthy' :
                       website.health_status === 'warning' ? 'Warning' : 'Critical'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Progress value={website.uptime} className="w-16 h-2" />
                        <span className="text-sm font-medium">{website.uptime}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      website.response_time < 500 ? 'text-green-600' :
                      website.response_time < 1000 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {website.response_time === 0 ? 'Timeout' : `${website.response_time}ms`}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {website.last_check}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-600">
                      ✓ Valid
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Error Summary */}
      <Card>
        <CardHeader>
          <CardTitle>🚨 Error Summary (Last 24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {websites.filter(w => w.failed_posts > 0).map((website) => (
              <div key={website.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span>🔴</span>
                  <div>
                    <div className="font-medium">{website.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {website.failed_posts} failed posts
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
            
            {websites.filter(w => w.failed_posts > 0).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <span className="text-4xl">✅</span>
                <p className="mt-2">No errors in the last 24 hours!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
