import { PublishingQueue } from '../PublishingQueue';

const mockItems = [
  { id: '1', title: 'Hướng dẫn SEO cơ bản', website: 'Blog Công Ty', scheduledAt: '14:00', status: 'pending' as const },
  { id: '2', title: 'Top 10 công cụ Marketing', website: 'Medium Blog', scheduledAt: '14:30', status: 'pending' as const },
  { id: '3', title: 'Chiến lược Content 2024', website: 'Trang Tin Tức', scheduledAt: '13:45', status: 'processing' as const },
  { id: '4', title: 'Email Marketing hiệu quả', website: 'Blog Công Ty', scheduledAt: '13:30', status: 'success' as const },
  { id: '5', title: 'Tối ưu WordPress', website: 'Medium Blog', scheduledAt: '13:15', status: 'success' as const },
  { id: '6', title: 'Social Media Tips', website: 'Trang Tin Tức', scheduledAt: '13:00', status: 'failed' as const },
];

export default function PublishingQueueExample() {
  return (
    <div className="p-6">
      <PublishingQueue items={mockItems} />
    </div>
  );
}
