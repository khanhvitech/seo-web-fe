import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface QueueItem {
  id: string;
  title: string;
  website: string;
  scheduledAt: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
}

const statusConfig = {
  pending: { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Chờ xử lý' },
  processing: { icon: Loader2, color: 'text-primary', bg: 'bg-primary/10', label: 'Đang đăng' },
  success: { icon: CheckCircle2, color: 'text-chart-2', bg: 'bg-chart-2/10', label: 'Thành công' },
  failed: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Thất bại' },
};

interface PublishingQueueProps {
  items: QueueItem[];
}

export function PublishingQueue({ items }: PublishingQueueProps) {
  const groupedItems = {
    pending: items.filter(i => i.status === 'pending'),
    processing: items.filter(i => i.status === 'processing'),
    success: items.filter(i => i.status === 'success'),
    failed: items.filter(i => i.status === 'failed'),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {(Object.keys(groupedItems) as Array<keyof typeof groupedItems>).map((status) => {
        const config = statusConfig[status];
        const Icon = config.icon;
        
        return (
          <Card key={status} data-testid={`queue-${status}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${config.color} ${status === 'processing' ? 'animate-spin' : ''}`} />
                </div>
                {config.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {groupedItems[status].length === 0 ? (
                <p className="text-sm text-muted-foreground">Không có mục nào</p>
              ) : (
                groupedItems[status].map((item) => (
                  <div key={item.id} className="p-3 border rounded-lg hover-elevate" data-testid={`queue-item-${item.id}`}>
                    <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                    <div className="flex items-center justify-between gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">{item.website}</Badge>
                      <span className="text-xs text-muted-foreground">{item.scheduledAt}</span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
