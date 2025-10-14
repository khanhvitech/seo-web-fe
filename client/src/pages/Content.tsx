import { ContentTable } from "@/components/ContentTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockContents = [
  { id: '1', title: 'Hướng dẫn SEO cho người mới bắt đầu', status: 'published' as const, wordCount: 1542, seoScore: 85, createdAt: '15/03/2024' },
  { id: '2', title: 'Top 10 công cụ Marketing 2024', status: 'scheduled' as const, wordCount: 2145, seoScore: 92, createdAt: '14/03/2024' },
  { id: '3', title: 'Chiến lược Content Marketing hiệu quả', status: 'ready' as const, wordCount: 1876, seoScore: 78, createdAt: '13/03/2024' },
  { id: '4', title: 'Cách tối ưu hóa website WordPress', status: 'published' as const, wordCount: 1324, seoScore: 88, createdAt: '12/03/2024' },
  { id: '5', title: 'Email Marketing cho doanh nghiệp nhỏ', status: 'ready' as const, wordCount: 1689, seoScore: 65, createdAt: '11/03/2024' },
  { id: '6', title: 'Social Media Marketing 2024', status: 'archived' as const, wordCount: 1452, seoScore: 71, createdAt: '10/03/2024' },
];

export default function Content() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Quản lý nội dung</h2>
        <Button data-testid="button-create-content">
          <Plus className="w-4 h-4 mr-2" />
          Tạo nội dung mới
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm nội dung..."
            className="pl-10"
            data-testid="input-search"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-48" data-testid="select-status">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="ready">Sẵn sàng</SelectItem>
            <SelectItem value="scheduled">Đã lên lịch</SelectItem>
            <SelectItem value="published">Đã đăng</SelectItem>
            <SelectItem value="archived">Lưu trữ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ContentTable contents={mockContents} />
    </div>
  );
}
