import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Rss, 
  Plus, 
  Edit, 
  Trash2, 
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Globe,
  Download
} from "lucide-react";

interface AutoSource {
  id: string;
  name: string;
  url: string;
  type: 'rss' | 'website' | 'api';
  frequency: 'hourly' | 'daily' | 'weekly';
  active: boolean;
  lastFetch: string;
  importedCount: number;
  errorCount: number;
  autoPublish: boolean;
  categoryMapping: string;
  tagMapping: string[];
}

const mockSources: AutoSource[] = [
  {
    id: '1',
    name: 'TechCrunch RSS',
    url: 'https://techcrunch.com/feed/',
    type: 'rss',
    frequency: 'daily',
    active: true,
    lastFetch: '15/03/2024 10:30',
    importedCount: 45,
    errorCount: 0,
    autoPublish: false,
    categoryMapping: 'Technology',
    tagMapping: ['tech', 'news']
  },
  {
    id: '2',
    name: 'Marketing Blog',
    url: 'https://blog.hubspot.com',
    type: 'website',
    frequency: 'weekly',
    active: true,
    lastFetch: '14/03/2024 15:45',
    importedCount: 12,
    errorCount: 2,
    autoPublish: false,
    categoryMapping: 'Marketing',
    tagMapping: ['marketing', 'business']
  },
  {
    id: '3',
    name: 'SEO News API',
    url: 'https://api.seonews.com/v1/articles',
    type: 'api',
    frequency: 'hourly',
    active: false,
    lastFetch: '12/03/2024 08:00',
    importedCount: 89,
    errorCount: 5,
    autoPublish: true,
    categoryMapping: 'SEO',
    tagMapping: ['seo', 'optimization']
  }
];

export function AutoSources() {
  const [sources] = useState<AutoSource[]>(mockSources);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedSource, setSelectedSource] = useState<AutoSource | null>(null);

  const getStatusIcon = (source: AutoSource) => {
    if (!source.active) {
      return <XCircle className="w-4 h-4 text-gray-500" />;
    }
    if (source.errorCount > 0) {
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  const getStatusLabel = (source: AutoSource) => {
    if (!source.active) return 'Không hoạt động';
    if (source.errorCount > 0) return 'Có lỗi';
    return 'Hoạt động';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rss':
        return <Rss className="w-4 h-4" />;
      case 'website':
        return <Globe className="w-4 h-4" />;
      case 'api':
        return <Download className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const frequencyLabels = {
    hourly: 'Hàng giờ',
    daily: 'Hàng ngày',
    weekly: 'Hàng tuần'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Nguồn tự động</h2>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm nguồn mới
        </Button>
      </div>

      {/* Sources Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên nguồn</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Tần suất</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Lần fetch cuối</TableHead>
                <TableHead>Đã import</TableHead>
                <TableHead>Lỗi</TableHead>
                <TableHead>Auto publish</TableHead>
                <TableHead className="w-32">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell>
                    <div className="font-medium">{source.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate text-sm text-muted-foreground">
                      {source.url}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(source.type)}
                      <span className="capitalize">{source.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {frequencyLabels[source.frequency]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(source)}
                      <span className="text-sm">{getStatusLabel(source)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{source.lastFetch}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{source.importedCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={source.errorCount > 0 ? "destructive" : "secondary"}>
                      {source.errorCount}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={source.autoPublish} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedSource(source)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Thêm nguồn tự động</CardTitle>
                <Button variant="ghost" onClick={() => setShowCreateForm(false)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Loại nguồn</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại nguồn..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rss">RSS Feed</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sourceName">Tên nguồn</Label>
                <Input id="sourceName" placeholder="Nhập tên nguồn..." />
              </div>

              <div>
                <Label htmlFor="sourceUrl">URL</Label>
                <Input id="sourceUrl" placeholder="https://..." />
              </div>

              <div>
                <Label>Tần suất fetch</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tần suất..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hàng giờ</SelectItem>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="weekly">Hàng tuần</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="parseRules">Quy tắc parse (JSON)</Label>
                <Textarea 
                  id="parseRules" 
                  placeholder='{"title": "h1", "content": ".content", "author": ".author"}'
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>

              <div>
                <Label htmlFor="contentFilter">Bộ lọc nội dung</Label>
                <Textarea 
                  id="contentFilter" 
                  placeholder="Nhập từ khóa hoặc regex để lọc nội dung..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Mapping danh mục</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="seo">SEO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="mappingTags">Mapping tags</Label>
                  <Input 
                    id="mappingTags" 
                    placeholder="tag1, tag2, tag3..." 
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="autoPublish" />
                <Label htmlFor="autoPublish">Tự động publish</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button>Test kết nối</Button>
                <Button variant="outline">Lưu</Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Hủy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Form Modal */}
      {selectedSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Chỉnh sửa nguồn: {selectedSource.name}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedSource(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Loại nguồn</Label>
                <Select value={selectedSource.type}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rss">RSS Feed</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="editSourceName">Tên nguồn</Label>
                <Input id="editSourceName" defaultValue={selectedSource.name} />
              </div>

              <div>
                <Label htmlFor="editSourceUrl">URL</Label>
                <Input id="editSourceUrl" defaultValue={selectedSource.url} />
              </div>

              <div>
                <Label>Tần suất fetch</Label>
                <Select value={selectedSource.frequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hàng giờ</SelectItem>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="weekly">Hàng tuần</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Mapping danh mục</Label>
                  <Select value={selectedSource.categoryMapping}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="SEO">SEO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="editMappingTags">Mapping tags</Label>
                  <Input 
                    id="editMappingTags" 
                    defaultValue={selectedSource.tagMapping.join(', ')} 
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="editAutoPublish" checked={selectedSource.autoPublish} />
                <Label htmlFor="editAutoPublish">Tự động publish</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="editActive" checked={selectedSource.active} />
                <Label htmlFor="editActive">Kích hoạt nguồn</Label>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Thống kê</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Lần fetch cuối:</span>
                    <p>{selectedSource.lastFetch}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Đã import:</span>
                    <p>{selectedSource.importedCount} bài</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Số lỗi:</span>
                    <p>{selectedSource.errorCount}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Fetch ngay
                </Button>
                <Button variant="outline">Test kết nối</Button>
                <Button variant="outline">Lưu thay đổi</Button>
                <Button variant="destructive">Xóa nguồn</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
