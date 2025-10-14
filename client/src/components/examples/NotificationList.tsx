import { NotificationList } from '../NotificationList';

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
];

export default function NotificationListExample() {
  return (
    <div className="p-6 max-w-2xl">
      <NotificationList notifications={mockNotifications} />
    </div>
  );
}
