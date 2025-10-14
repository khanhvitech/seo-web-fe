import { StatsCard } from "@/components/StatsCard";
import { ContentTable } from "@/components/ContentTable";
import { NotificationList } from "@/components/NotificationList";
import { FileText, Globe, Calendar, CheckCircle } from "lucide-react";

const mockContents = [
  { id: '1', title: 'Hướng dẫn SEO cho người mới bắt đầu', status: 'published' as const, wordCount: 1542, seoScore: 85, createdAt: '15/03/2024' },
  { id: '2', title: 'Top 10 công cụ Marketing 2024', status: 'scheduled' as const, wordCount: 2145, seoScore: 92, createdAt: '14/03/2024' },
  { id: '3', title: 'Chiến lược Content Marketing hiệu quả', status: 'ready' as const, wordCount: 1876, seoScore: 78, createdAt: '13/03/2024' },
  { id: '4', title: 'Cách tối ưu hóa website WordPress', status: 'published' as const, wordCount: 1324, seoScore: 88, createdAt: '12/03/2024' },
];

const mockNotifications = [
  {
    id: '1',
    type: 'success' as const,
    title: 'Đăng bài thành công',
    message: 'Bài viết "Hướng dẫn SEO" đã được đăng lên Blog Công Ty',
    time: '5 phút trước',
    isRead: false,
  },
  {
    id: '2',
    type: 'error' as const,
    title: 'Đăng bài thất bại',
    message: 'Không thể kết nối đến Medium Blog. Vui lòng kiểm tra lại cấu hình.',
    time: '15 phút trước',
    isRead: false,
  },
  {
    id: '3',
    type: 'info' as const,
    title: 'Lịch đăng bài sắp tới',
    message: 'Bạn có 5 bài viết sẽ được đăng trong 2 giờ tới',
    time: '1 giờ trước',
    isRead: true,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Tổng nội dung" value="248" icon={FileText} change="+12% so với tháng trước" changeType="increase" />
        <StatsCard title="Website kết nối" value="8" icon={Globe} change="+2 mới" changeType="increase" />
        <StatsCard title="Đã lên lịch" value="64" icon={Calendar} change="-5% so với tuần trước" changeType="decrease" />
        <StatsCard title="Đã đăng" value="1,429" icon={CheckCircle} change="+8% so với tháng trước" changeType="increase" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Nội dung gần đây</h3>
          <ContentTable contents={mockContents} />
        </div>
        <div>
          <NotificationList notifications={mockNotifications} />
        </div>
      </div>
    </div>
  );
}
