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
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Tiêu đề</TableHead>
            <TableHead className="font-semibold">Trạng thái</TableHead>
            <TableHead className="font-semibold">Số từ</TableHead>
            <TableHead className="font-semibold">Điểm SEO</TableHead>
            <TableHead className="font-semibold">Ngày tạo</TableHead>
            <TableHead className="w-12"></TableHead>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" data-testid={`button-actions-${content.id}`}>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem data-testid={`menu-view-${content.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      Xem
                    </DropdownMenuItem>
                    <DropdownMenuItem data-testid={`menu-edit-${content.id}`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" data-testid={`menu-delete-${content.id}`}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
