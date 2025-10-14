import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Info, Bell } from "lucide-react";

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const typeConfig = {
  success: { icon: CheckCircle2, color: 'text-chart-2', bg: 'bg-chart-2/10' },
  error: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
  info: { icon: Info, color: 'text-primary', bg: 'bg-primary/10' },
};

interface NotificationListProps {
  notifications: Notification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Thông báo
        </CardTitle>
        <Button variant="ghost" size="sm" data-testid="button-mark-all-read">
          Đánh dấu đã đọc
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;
          
          return (
            <div
              key={notification.id}
              className={`flex gap-3 p-4 rounded-lg border hover-elevate ${!notification.isRead ? 'bg-muted/50' : ''}`}
              data-testid={`notification-${notification.id}`}
            >
              <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
