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
import { Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Content {
  id: string;
  title: string;
  status: 'ready' | 'scheduled' | 'published' | 'archived';
  wordCount: number;
  seoScore: number;
  createdAt: string;
}

const statusVariants = {
  ready: 'secondary',
  scheduled: 'default',
  published: 'default',
  archived: 'secondary',
} as const;

const statusLabels = {
  ready: 'Sẵn sàng',
  scheduled: 'Đã lên lịch',
  published: 'Đã đăng',
  archived: 'Lưu trữ',
};

interface ContentTableProps {
  contents: Content[];
}

export function ContentTable({ contents }: ContentTableProps) {
  const [viewingContent, setViewingContent] = useState<Content | null>(null);

  const handleView = (content: Content) => {
    setViewingContent(content);
  };

  const handleEdit = (content: Content) => {
    // TODO: Implement edit functionality
    console.log('Edit content:', content.id);
  };

  const handleDelete = (content: Content) => {
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${content.title}"?`);
    if (confirmed) {
      // TODO: Implement delete functionality
      console.log('Delete content:', content.id);
    }
  };
  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Tiêu đề</TableHead>
              <TableHead className="font-semibold">Trạng thái</TableHead>
              <TableHead className="font-semibold">Số từ</TableHead>
              <TableHead className="font-semibold">Điểm SEO</TableHead>
              <TableHead className="font-semibold">Ngày tạo</TableHead>
              <TableHead className="w-32">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contents.map((content) => (
              <TableRow key={content.id} data-testid={`row-content-${content.id}`}>
                <TableCell className="font-medium">{content.title}</TableCell>
                <TableCell>
                  <Badge variant={statusVariants[content.status]}>
                    {statusLabels[content.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{content.wordCount.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`font-medium ${content.seoScore >= 80 ? 'text-chart-2' : content.seoScore >= 60 ? 'text-chart-4' : 'text-destructive'}`}>
                    {content.seoScore}/100
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{content.createdAt}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleView(content)}
                      data-testid={`button-view-${content.id}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEdit(content)}
                      data-testid={`button-edit-${content.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(content)}
                      data-testid={`button-delete-${content.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
                    <Badge variant={statusVariants[viewingContent.status]}>
                      {statusLabels[viewingContent.status]}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Ngày tạo:</label>
                  <p className="mt-1">{viewingContent.createdAt}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Số từ:</label>
                  <p className="mt-1">{viewingContent.wordCount.toLocaleString()}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Điểm SEO:</label>
                  <p className={`mt-1 font-medium ${viewingContent.seoScore >= 80 ? 'text-chart-2' : viewingContent.seoScore >= 60 ? 'text-chart-4' : 'text-destructive'}`}>
                    {viewingContent.seoScore}/100
                  </p>
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
