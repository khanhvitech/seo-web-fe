import { ContentTable } from '../ContentTable';

const mockContents = [
  { id: '1', title: 'Hướng dẫn SEO cho người mới bắt đầu', status: 'published' as const, wordCount: 1542, seoScore: 85, createdAt: '15/03/2024' },
  { id: '2', title: 'Top 10 công cụ Marketing 2024', status: 'scheduled' as const, wordCount: 2145, seoScore: 92, createdAt: '14/03/2024' },
  { id: '3', title: 'Chiến lược Content Marketing hiệu quả', status: 'ready' as const, wordCount: 1876, seoScore: 78, createdAt: '13/03/2024' },
  { id: '4', title: 'Cách tối ưu hóa website WordPress', status: 'published' as const, wordCount: 1324, seoScore: 88, createdAt: '12/03/2024' },
  { id: '5', title: 'Email Marketing cho doanh nghiệp nhỏ', status: 'ready' as const, wordCount: 1689, seoScore: 65, createdAt: '11/03/2024' },
];

export default function ContentTableExample() {
  return (
    <div className="p-6">
      <ContentTable contents={mockContents} />
    </div>
  );
}
