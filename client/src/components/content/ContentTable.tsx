import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  FileText,
  Video,
  Image,
  User,
  Upload,
  Rss,
  Globe,
  Bot,
  Download
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Content {
  id: string;
  title: string;
  status: 'draft' | 'ready' | 'published' | 'archived';
  content_type: 'article' | 'video' | 'infographic';
  source_type: 'manual' | 'file' | 'rss' | 'url' | 'ai';
  categories: string[];
  language: string;
  word_count: number;
  seo_score: number;
  created_at: string;
  published_at?: string;
}

const statusVariants = {
  draft: 'secondary',
  ready: 'default',
  published: 'default',
  archived: 'secondary',
} as const;

const statusLabels = {
  draft: 'Bản nháp',
  ready: 'Sẵn sàng',
  published: 'Đã đăng',
  archived: 'Lưu trữ',
};

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  ready: 'bg-blue-100 text-blue-800',
  published: 'bg-green-100 text-green-800',
  archived: 'bg-orange-100 text-orange-800',
};

const contentTypeIcons = {
  article: FileText,
  video: Video,
  infographic: Image,
};

const sourceTypeIcons = {
  manual: User,
  file: Upload,
  rss: Rss,
  url: Globe,
  ai: Bot,
};

const languageFlags = {
  'vi': '🇻🇳',
  'en': '🇺🇸',
  'ja': '🇯🇵',
  'ko': '🇰🇷',
  'zh': '🇨🇳',
};

interface ContentTableProps {
  contents: Content[];
  onEdit?: (content: Content) => void;
}

export function ContentTable({ contents = [], onEdit }: ContentTableProps) {
  const [viewingContent, setViewingContent] = useState<Content | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [contentTypeFilter, setContentTypeFilter] = useState<string>('all');
  const [sourceTypeFilter, setSourceTypeFilter] = useState<string>('all');
  const [languageFilter, setLanguageFilter] = useState<string>('all');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(contents.map(content => content.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (contentId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, contentId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== contentId));
    }
  };

  const handleView = (content: Content) => {
    setViewingContent(content);
  };

  const handleEdit = (content: Content) => {
    if (onEdit) {
      onEdit(content);
    } else {
      console.log('Edit content:', content.id);
    }
  };

  const handleDelete = (content: Content) => {
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${content.title}"?`);
    if (confirmed) {
      console.log('Delete content:', content.id);
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa ${selectedItems.length} bài viết đã chọn?`);
    if (confirmed) {
      console.log('Bulk delete:', selectedItems);
      setSelectedItems([]);
    }
  };

  const handleBulkStatusChange = (newStatus: string) => {
    if (selectedItems.length === 0) return;
    console.log('Bulk status change:', selectedItems, 'to', newStatus);
    setSelectedItems([]);
  };

  const handleExportCSV = () => {
    console.log('Export CSV for:', selectedItems.length > 0 ? selectedItems : 'all');
  };

  // Filter logic
  const filteredContents = contents.filter(content => {
    if (searchTerm && !content.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'all' && content.status !== statusFilter) {
      return false;
    }
    if (contentTypeFilter !== 'all' && content.content_type !== contentTypeFilter) {
      return false;
    }
    if (sourceTypeFilter !== 'all' && content.source_type !== sourceTypeFilter) {
      return false;
    }
    if (languageFilter !== 'all' && content.language !== languageFilter) {
      return false;
    }
    return true;
  });
  
  return (
    <>
      {/* Bộ lọc */}
      <div className="space-y-4 mb-6">
        {/* Thanh tìm kiếm và actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm nội dung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Bulk actions */}
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Đã chọn {selectedItems.length} mục
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Đổi trạng thái
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleBulkStatusChange('draft')}>
                    Bản nháp
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkStatusChange('ready')}>
                    Sẵn sàng
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkStatusChange('published')}>
                    Đã đăng
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkStatusChange('archived')}>
                    Lưu trữ
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                <Trash2 className="w-4 h-4 mr-1" />
                Xóa
              </Button>
            </div>
          )}
        </div>

        {/* Bộ lọc */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Lọc:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Trạng thái:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="draft">Bản nháp</SelectItem>
                <SelectItem value="ready">Sẵn sàng</SelectItem>
                <SelectItem value="published">Đã đăng</SelectItem>
                <SelectItem value="archived">Lưu trữ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Loại:</span>
            <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Chọn loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="article">Bài viết</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="infographic">Infographic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Nguồn:</span>
            <Select value={sourceTypeFilter} onValueChange={setSourceTypeFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Chọn nguồn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="manual">Thủ công</SelectItem>
                <SelectItem value="file">File</SelectItem>
                <SelectItem value="rss">RSS</SelectItem>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="ai">AI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ngôn ngữ:</span>
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Chọn ngôn ngữ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Hiển thị active filters */}
        {(statusFilter !== 'all' || contentTypeFilter !== 'all' || sourceTypeFilter !== 'all' || languageFilter !== 'all' || searchTerm) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Đang lọc:</span>
            
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Tìm kiếm: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            
            {statusFilter !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Trạng thái: {statusLabels[statusFilter as keyof typeof statusLabels]}
                <button
                  onClick={() => setStatusFilter('all')}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            
            {contentTypeFilter !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Loại: {contentTypeFilter === 'article' ? 'Bài viết' : contentTypeFilter === 'video' ? 'Video' : 'Infographic'}
                <button
                  onClick={() => setContentTypeFilter('all')}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            
            {sourceTypeFilter !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Nguồn: {sourceTypeFilter === 'manual' ? 'Thủ công' : sourceTypeFilter}
                <button
                  onClick={() => setSourceTypeFilter('all')}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            
            {languageFilter !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Ngôn ngữ: {languageFilter === 'vi' ? 'Tiếng Việt' : languageFilter === 'en' ? 'English' : languageFilter}
                <button
                  onClick={() => setLanguageFilter('all')}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setContentTypeFilter('all');
                setSourceTypeFilter('all');
                setLanguageFilter('all');
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              Xóa tất cả bộ lọc
            </Button>
          </div>
        )}
      </div>

      {/* Bảng */}
      <div className="space-y-4">
        {/* Hiển thị số kết quả */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Hiển thị {filteredContents.length} / {contents.length} kết quả
          </p>
          {filteredContents.length !== contents.length && (
            <p className="text-xs text-muted-foreground">
              Đã lọc bỏ {contents.length - filteredContents.length} mục
            </p>
          )}
        </div>

        <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedItems.length === filteredContents.length && filteredContents.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-semibold">Tiêu đề</TableHead>
              <TableHead className="font-semibold">Trạng thái</TableHead>
              <TableHead className="font-semibold">Loại</TableHead>
              <TableHead className="font-semibold">Nguồn</TableHead>
              <TableHead className="font-semibold">Danh mục</TableHead>
              <TableHead className="font-semibold">Ngôn ngữ</TableHead>
              <TableHead className="font-semibold">Số từ</TableHead>
              <TableHead className="font-semibold">Điểm SEO</TableHead>
              <TableHead className="font-semibold">Ngày tạo</TableHead>
              <TableHead className="font-semibold">Ngày đăng</TableHead>
              <TableHead className="w-32">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContents && filteredContents.length > 0 ? (
              filteredContents.map((content) => {
                const ContentTypeIcon = contentTypeIcons[content.content_type];
                const SourceTypeIcon = sourceTypeIcons[content.source_type];
                
                return (
                  <TableRow key={content.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedItems.includes(content.id)}
                        onCheckedChange={(checked) => handleSelectItem(content.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <button 
                        className="font-medium hover:text-primary text-left"
                        onClick={() => handleView(content)}
                      >
                        {content.title}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[content.status]}>
                        {statusLabels[content.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ContentTypeIcon className="w-4 h-4" />
                        <span className="text-sm capitalize">{content.content_type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <SourceTypeIcon className="w-4 h-4" />
                        <Badge variant="outline" className="text-xs">
                          {content.source_type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {content.categories.map((category, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{languageFlags[content.language as keyof typeof languageFlags] || '🌐'}</span>
                        <span className="text-sm">{content.language.toUpperCase()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {content.word_count.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          content.seo_score >= 80 
                            ? 'bg-green-100 text-green-800' 
                            : content.seo_score >= 60 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {content.seo_score}/100
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {content.created_at}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {content.published_at || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleView(content)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(content)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(content)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={11} className="text-center text-muted-foreground py-8">
                  Không tìm thấy nội dung nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      </div>

      {/* Dialog xem chi tiết bài viết */}
      <Dialog open={!!viewingContent} onOpenChange={() => setViewingContent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết bài viết</DialogTitle>
          </DialogHeader>
          {viewingContent && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{viewingContent.title}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Trạng thái:</label>
                  <div className="mt-1">
                    <Badge className={statusColors[viewingContent.status]}>
                      {statusLabels[viewingContent.status]}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Loại nội dung:</label>
                  <div className="mt-1 flex items-center gap-2">
                    {(() => {
                      const Icon = contentTypeIcons[viewingContent.content_type];
                      return <Icon className="w-4 h-4" />;
                    })()}
                    <span className="capitalize">{viewingContent.content_type}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nguồn:</label>
                  <div className="mt-1 flex items-center gap-2">
                    {(() => {
                      const Icon = sourceTypeIcons[viewingContent.source_type];
                      return <Icon className="w-4 h-4" />;
                    })()}
                    <Badge variant="outline">{viewingContent.source_type}</Badge>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Ngôn ngữ:</label>
                  <div className="mt-1 flex items-center gap-2">
                    <span>{languageFlags[viewingContent.language as keyof typeof languageFlags] || '🌐'}</span>
                    <span>{viewingContent.language.toUpperCase()}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Ngày tạo:</label>
                  <p className="mt-1">{viewingContent.created_at}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Ngày đăng:</label>
                  <p className="mt-1">{viewingContent.published_at || 'Chưa đăng'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Số từ:</label>
                  <p className="mt-1">{viewingContent.word_count.toLocaleString()}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Điểm SEO:</label>
                  <p className={`mt-1 font-medium ${viewingContent.seo_score >= 80 ? 'text-chart-2' : viewingContent.seo_score >= 60 ? 'text-chart-4' : 'text-destructive'}`}>
                    {viewingContent.seo_score}/100
                  </p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Danh mục:</label>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {viewingContent.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nội dung preview:</label>
                <div className="mt-2 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Đây là nội dung preview của bài viết. Trong thực tế sẽ hiển thị nội dung thật của bài viết...
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
