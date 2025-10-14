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
  { icon: LayoutDashboard, label: 'Dashboard', href: '/', disabled: true },
  { icon: FileText, label: 'Quản lý nội dung', href: '/content', badge: 42 },
  { icon: Globe, label: 'Quản lý website', href: '/websites', badge: 8 },
  { icon: Calendar, label: 'Lên lịch', href: '/scheduling', badge: 24, disabled: true },
  { icon: Rocket, label: 'Đăng bài', href: '/publishing', badge: 5, badgeVariant: 'destructive' as const, disabled: true },
  { icon: Sparkles, label: 'SEO', href: '/seo', disabled: true },
  { icon: BarChart3, label: 'Báo cáo', href: '/analytics', disabled: true },
  { icon: Bell, label: 'Thông báo', href: '/notifications', badge: 12, disabled: true },
  { icon: Settings, label: 'Cài đặt', href: '/settings', disabled: true },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="h-16 px-6 border-b border-sidebar-border flex items-center">
        <h1 className="text-xl font-bold text-sidebar-foreground">MKT SEO Web</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.href;
                const isDisabled = item.disabled;
                
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild={!isDisabled} 
                      isActive={isActive && !isDisabled} 
                      data-testid={`link-${item.label.toLowerCase()}`}
                      className={isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      {isDisabled ? (
                        <div className="flex items-center w-full">
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
                        </div>
                      ) : (
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
                      )}
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
