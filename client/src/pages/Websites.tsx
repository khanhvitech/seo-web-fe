import { WebsiteCard } from "@/components/WebsiteCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockWebsites = [
  {
    id: '1',
    name: 'Blog Công Ty',
    url: 'https://blog.congty.vn',
    platform: 'WordPress',
    status: 'active' as const,
    totalPosts: 245,
    successRate: 98,
  },
  {
    id: '2',
    name: 'Trang Tin Tức',
    url: 'https://news.example.com',
    platform: 'Blogger',
    status: 'active' as const,
    totalPosts: 132,
    successRate: 95,
  },
  {
    id: '3',
    name: 'Medium Blog',
    url: 'https://medium.com/@company',
    platform: 'Medium',
    status: 'error' as const,
    totalPosts: 89,
    successRate: 72,
  },
  {
    id: '4',
    name: 'Website Chính',
    url: 'https://company.vn/blog',
    platform: 'WordPress',
    status: 'active' as const,
    totalPosts: 456,
    successRate: 99,
  },
  {
    id: '5',
    name: 'Trang Cộng Đồng',
    url: 'https://community.example.com',
    platform: 'Custom',
    status: 'inactive' as const,
    totalPosts: 67,
    successRate: 88,
  },
  {
    id: '6',
    name: 'Blog Tiếng Anh',
    url: 'https://en.blog.company.com',
    platform: 'WordPress',
    status: 'active' as const,
    totalPosts: 198,
    successRate: 96,
  },
];

export default function Websites() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Quản lý Website</h2>
        <Button data-testid="button-add-website">
          <Plus className="w-4 h-4 mr-2" />
          Thêm Website
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockWebsites.map((website) => (
          <WebsiteCard key={website.id} {...website} />
        ))}
      </div>
    </div>
  );
}
