import { Website } from "@/types/website";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Globe, 
  MoreHorizontal, 
  TestTube, 
  Settings, 
  Edit,
  Trash2
} from "lucide-react";

interface WebsiteGridProps {
  websites: Website[];
  onEdit?: (website: Website) => void;
  onDelete?: (websiteId: string) => void;
  onTest?: (websiteId: string) => void;
  onSettings?: (websiteId: string) => void;
}

export function WebsiteGrid({ 
  websites, 
  onEdit, 
  onDelete, 
  onTest, 
  onSettings 
}: WebsiteGridProps) {
  const getStatusColor = (healthStatus: string) => {
    switch (healthStatus) {
      case 'healthy':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'critical':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
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

  const getPlatformBadge = (platform: string) => {
    const platformConfig = {
      wordpress: { label: "🔧 WordPress", color: "bg-blue-100 text-blue-800" },
      blogger: { label: "📝 Blogger", color: "bg-orange-100 text-orange-800" },
      joomla: { label: "🌟 Joomla", color: "bg-purple-100 text-purple-800" },
      custom: { label: "⚙️ Custom", color: "bg-gray-100 text-gray-800" },
    };
    
    const config = platformConfig[platform as keyof typeof platformConfig] || {
      label: `🔧 ${platform}`,
      color: "bg-gray-100 text-gray-800",
    };
    
    return config;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {websites.map((website) => {
        const statusColor = getStatusColor(website.health_status);
        const statusIcon = getStatusIcon(website.health_status);
        const platformConfig = getPlatformBadge(website.platform);
        
        return (
          <Card key={website.id} className={`${statusColor} transition-all hover:shadow-md`}>
            <CardContent className="p-4">
              {/* Header with status */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{statusIcon}</span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {website.url.replace('https://', '').replace('http://', '')}
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onTest?.(website.id)}>
                      <TestTube className="w-4 h-4 mr-2" />
                      Test
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onSettings?.(website.id)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(website)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete?.(website.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Website info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded border flex items-center justify-center">
                    {website.favicon ? (
                      <img src={website.favicon} alt="" className="w-5 h-5" />
                    ) : (
                      <Globe className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{website.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{website.url}</div>
                  </div>
                </div>

                {/* Group and Platform */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    📁 {website.group_name}
                  </Badge>
                  <Badge className={`text-xs ${platformConfig.color}`}>
                    {platformConfig.label}
                  </Badge>
                </div>

                {/* Health bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Health:</span>
                    <span className="font-medium">{website.uptime}%</span>
                  </div>
                  <Progress value={website.uptime} className="h-2" />
                </div>

                {/* Stats */}
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>Last check: {website.last_check}</div>
                  <div className="flex justify-between">
                    <span>Posts: {website.total_posts}</span>
                    {website.failed_posts > 0 && (
                      <span className="text-destructive">Errors: {website.failed_posts}</span>
                    )}
                  </div>
                  <div>Response: {website.response_time}ms</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => onTest?.(website.id)}
                >
                  Test
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => onSettings?.(website.id)}
                >
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
