import { WebsiteCard } from '../WebsiteCard';

export default function WebsiteCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      <WebsiteCard 
        id="1"
        name="Blog Công Ty"
        url="https://blog.congty.vn"
        platform="WordPress"
        status="active"
        totalPosts={245}
        successRate={98}
      />
      <WebsiteCard 
        id="2"
        name="Trang Tin Tức"
        url="https://news.example.com"
        platform="Blogger"
        status="active"
        totalPosts={132}
        successRate={95}
      />
      <WebsiteCard 
        id="3"
        name="Medium Blog"
        url="https://medium.com/@company"
        platform="Medium"
        status="error"
        totalPosts={89}
        successRate={72}
      />
    </div>
  );
}
