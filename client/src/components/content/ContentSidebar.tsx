import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Plus, 
  FolderOpen, 
  Tag, 
  Image, 
  Rss,
  Hash,
  Wand2,
  RefreshCw,
  Bot
} from "lucide-react";

interface ContentSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  { 
    id: 'all-content', 
    label: 'Tất cả nội dung', 
    icon: FileText, 
    count: 156 
  },
  { 
    id: 'ai-images', 
    label: 'Tạo ảnh AI', 
    icon: Wand2, 
    count: 324,
    disabled: true
  },
  { 
    id: 'rewrite-content', 
    label: 'Viết lại bài viết', 
    icon: RefreshCw, 
    count: 0,
    disabled: true
  },
  { 
    id: 'ai-content', 
    label: 'Tạo bài viết từ AI', 
    icon: Bot, 
    count: 0,
    disabled: true
  },
  { 
    id: 'auto-sources', 
    label: 'Nguồn tự động', 
    icon: Rss, 
    count: 5,
    disabled: true
  }
];

export function ContentSidebar({ activeView, onViewChange }: ContentSidebarProps) {
  return (
    <Card className="w-64 h-full rounded-none border-r border-l-0 border-t-0 border-b-0">
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-4">Quản lý nội dung</h3>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start h-10 ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !item.disabled && onViewChange(item.id)}
                disabled={item.disabled}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count && (
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </Button>
            );
          })}
        </nav>
        
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Thống kê nhanh
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Bài nháp</span>
              <span className="text-orange-600">24</span>
            </div>
            <div className="flex justify-between">
              <span>Sẵn sàng</span>
              <span className="text-blue-600">18</span>
            </div>
            <div className="flex justify-between">
              <span>Đã xuất bản</span>
              <span className="text-green-600">98</span>
            </div>
            <div className="flex justify-between">
              <span>Đã lên lịch</span>
              <span className="text-purple-600">16</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
