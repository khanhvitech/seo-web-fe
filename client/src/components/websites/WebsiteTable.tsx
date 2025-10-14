import { useState } from "react";
import { Website } from "@/types/website";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MoreHorizontal,
  Edit,
  TestTube,
  Trash2,
  Settings,
  Globe,
  RefreshCw,
  Download,
} from "lucide-react";

interface WebsiteTableProps {
  websites: Website[];
  onEdit?: (website: Website) => void;
  onDelete?: (websiteId: string) => void;
  onTest?: (websiteId: string) => void;
  onSettings?: (websiteId: string) => void;
  onBulkAction?: (action: string, websiteIds: string[]) => void;
}

export function WebsiteTable({
  websites,
  onEdit,
  onDelete,
  onTest,
  onSettings,
  onBulkAction,
}: WebsiteTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const getStatusIcon = (healthStatus: string) => {
    switch (healthStatus) {
      case 'healthy':
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
      case 'warning':
        return <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>;
      case 'critical':
        return <div className="w-3 h-3 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
    }
  };

  const getPlatformBadge = (platform: string) => {
    const platformConfig = {
      wordpress: { label: "WordPress", variant: "default" as const },
      blogger: { label: "Blogger", variant: "secondary" as const },
      joomla: { label: "Joomla", variant: "outline" as const },
      custom: { label: "Custom", variant: "destructive" as const },
    };
    
    const config = platformConfig[platform as keyof typeof platformConfig] || {
      label: platform,
      variant: "secondary" as const,
    };
    
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredWebsites = websites.filter((website) => {
    const matchesSearch = website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         website.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === "all" || website.group_id === selectedGroup;
    const matchesPlatform = selectedPlatform === "all" || website.platform === selectedPlatform;
    const matchesStatus = selectedStatus === "all" || website.status === selectedStatus;
    
    return matchesSearch && matchesGroup && matchesPlatform && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredWebsites.map(w => w.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (websiteId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, websiteId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== websiteId));
    }
  };

  const groups = Array.from(new Set(websites.map(w => ({ id: w.group_id, name: w.group_name }))));
  const platforms = Array.from(new Set(websites.map(w => w.platform)));

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm tên hoặc URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Chọn nhóm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả nhóm</SelectItem>
            {groups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                📁 {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {platforms.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <span className="text-sm text-muted-foreground">
            Đã chọn {selectedItems.length} website(s)
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Hành động
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onBulkAction?.('activate', selectedItems)}>
                ✅ Kích hoạt
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkAction?.('deactivate', selectedItems)}>
                ❌ Vô hiệu hóa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkAction?.('health-check', selectedItems)}>
                🔍 Kiểm tra sức khỏe
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkAction?.('sync', selectedItems)}>
                🔄 Đồng bộ
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkAction?.('export', selectedItems)}>
                📥 Export config
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onBulkAction?.('delete', selectedItems)}
                className="text-destructive"
              >
                🗑️ Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedItems.length === filteredWebsites.length && filteredWebsites.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-16">Status</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Nhóm</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Health</TableHead>
              <TableHead>Last Check</TableHead>
              <TableHead>Posts</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWebsites.map((website) => (
              <TableRow key={website.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(website.id)}
                    onCheckedChange={(checked) => handleSelectItem(website.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  {getStatusIcon(website.health_status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                      {website.favicon ? (
                        <img src={website.favicon} alt="" className="w-4 h-4" />
                      ) : (
                        <Globe className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{website.name}</div>
                      <div className="text-sm text-muted-foreground">{website.url}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">📁 {website.group_name}</Badge>
                </TableCell>
                <TableCell>
                  {getPlatformBadge(website.platform)}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Progress value={website.uptime} className="w-16 h-2" />
                      <span className="text-sm">{website.uptime}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {website.response_time}ms
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {website.last_check}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{website.total_posts}</div>
                    {website.failed_posts > 0 && (
                      <div className="text-destructive text-xs">
                        {website.failed_posts} failed
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onTest?.(website.id)}
                    >
                      <TestTube className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSettings?.(website.id)}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit?.(website)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onTest?.(website.id)}>
                          <TestTube className="w-4 h-4 mr-2" />
                          Test kết nối
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSettings?.(website.id)}>
                          <Settings className="w-4 h-4 mr-2" />
                          Cài đặt
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete?.(website.id)} className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredWebsites.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Không tìm thấy website nào phù hợp với bộ lọc.
        </div>
      )}
    </div>
  );
}
