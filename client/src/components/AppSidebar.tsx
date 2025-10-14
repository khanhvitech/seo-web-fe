import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  FileText, 
  Globe, 
  Calendar, 
  Rocket, 
  Sparkles, 
  BarChart3, 
  Bell, 
  Settings 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: FileText, label: 'Nội dung', href: '/content', badge: 42 },
  { icon: Globe, label: 'Website', href: '/websites', badge: 8 },
  { icon: Calendar, label: 'Lên lịch', href: '/scheduling', badge: 24 },
  { icon: Rocket, label: 'Đăng bài', href: '/publishing', badge: 5, badgeVariant: 'destructive' as const },
  { icon: Sparkles, label: 'SEO', href: '/seo' },
  { icon: BarChart3, label: 'Báo cáo', href: '/analytics' },
  { icon: Bell, label: 'Thông báo', href: '/notifications', badge: 12 },
  { icon: Settings, label: 'Cài đặt', href: '/settings' },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">MKT SEO Web</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive} data-testid={`link-${item.label.toLowerCase()}`}>
                      <Link href={item.href}>
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant={item.badgeVariant || "secondary"} 
                            className="ml-auto"
                            data-testid={`badge-${item.label.toLowerCase()}`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
