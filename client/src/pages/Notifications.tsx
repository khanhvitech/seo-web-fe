import { NotificationList } from "@/components/NotificationList";

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
  {
    id: '4',
    type: 'success' as const,
    title: 'Website mới được thêm',
    message: 'Trang Tin Tức đã được kết nối thành công',
    time: '2 giờ trước',
    isRead: true,
  },
  {
    id: '5',
    type: 'info' as const,
    title: 'Cập nhật hệ thống',
    message: 'Hệ thống sẽ bảo trì vào 2:00 AM ngày mai',
    time: '3 giờ trước',
    isRead: true,
  },
  {
    id: '6',
    type: 'success' as const,
    title: 'Xuất bản thành công',
    message: '3 bài viết đã được đăng lên các website',
    time: '4 giờ trước',
    isRead: true,
  },
];

export default function Notifications() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Thông báo</h2>
      <NotificationList notifications={mockNotifications} />
    </div>
  );
}
