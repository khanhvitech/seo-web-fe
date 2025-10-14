import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, MoreVertical, Activity } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WebsiteCardProps {
  id: string;
  name: string;
  url: string;
  platform: string;
  status: 'active' | 'inactive' | 'error';
  totalPosts: number;
  successRate: number;
}

const statusVariants = {
  active: 'default',
  inactive: 'secondary',
  error: 'destructive',
} as const;

const statusLabels = {
  active: 'Hoạt động',
  inactive: 'Tạm dừng',
  error: 'Lỗi',
};

export function WebsiteCard({ id, name, url, platform, status, totalPosts, successRate }: WebsiteCardProps) {
  return (
    <Card data-testid={`card-website-${id}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base font-semibold truncate">{name}</CardTitle>
            <p className="text-sm text-muted-foreground truncate">{url}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="flex-shrink-0" data-testid={`button-menu-${id}`}>
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Cấu hình</DropdownMenuItem>
            <DropdownMenuItem>Kiểm tra kết nối</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant={statusVariants[status]}>{statusLabels[status]}</Badge>
          <Badge variant="outline">{platform}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <p className="text-xs text-muted-foreground">Tổng bài viết</p>
            <p className="text-lg font-semibold mt-1" data-testid={`text-total-posts-${id}`}>{totalPosts}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Tỷ lệ thành công</p>
            <p className="text-lg font-semibold mt-1 flex items-center gap-1">
              <Activity className="w-4 h-4 text-chart-2" />
              <span data-testid={`text-success-rate-${id}`}>{successRate}%</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
