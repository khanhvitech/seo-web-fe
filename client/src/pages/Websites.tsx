import { useState } from "react";
import { Website, HealthStats, SiteGroup } from "@/types/website";
import { WebsiteStatsCards } from "@/components/websites/WebsiteStatsCards";
import { WebsiteTable } from "@/components/websites/WebsiteTable";
import { AddWebsiteModal } from "@/components/websites/AddWebsiteModal";
import { WebsiteGroupSidebar } from "@/components/websites/WebsiteGroupSidebar";
import { HealthMonitoring } from "@/components/websites/HealthMonitoring";
import { WebsiteStatistics } from "@/components/websites/WebsiteStatistics";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Filter,
  Users
} from "lucide-react";

// Mock groups data
const mockGroups: SiteGroup[] = [
  {
    id: '1',
    name: 'Marketing Sites',
    description: 'Websites for marketing purposes',
    color: '#3b82f6',
    website_count: 5,
  },
  {
    id: '2',
    name: 'Blog Network',
    description: 'Personal and corporate blogs',
    color: '#10b981',
    website_count: 8,
  },
  {
    id: '3',
    name: 'Client Sites',
    description: 'Client websites we manage',
    color: '#f59e0b',
    website_count: 3,
  },
];

const mockWebsites: Website[] = [
  {
    id: '1',
    name: 'My Tech Blog',
    url: 'https://techblog.com',
    favicon: '',
    group_id: '1',
    group_name: 'Marketing Sites',
    platform: 'wordpress',
    platform_version: '6.4',
    status: 'active',
    health_status: 'healthy',
    health_score: 95,
    uptime: 99.9,
    response_time: 245,
    last_check: '2 phút trước',
    last_successful_post: '2 giờ trước',
    total_posts: 145,
    failed_posts: 2,
    created_at: '15/10/2024',
    updated_at: '16/10/2024',
    settings: {
      auth_type: 'app_password',
      credentials: {},
      defaults: {
        tags: ['tech', 'seo'],
        post_status: 'publish',
      },
      seo: {
        auto_canonical: true,
        noindex_drafts: true,
        nofollow_external: false,
      },
      customization: {
        custom_fields: {},
      },
      notifications: {
        events: [],
      },
      timezone: 'Asia/Ho_Chi_Minh',
    },
  },
  {
    id: '2',
    name: 'Business Blog',
    url: 'https://businessblog.com',
    favicon: '',
    group_id: '1',
    group_name: 'Marketing Sites',
    platform: 'wordpress',
    status: 'active',
    health_status: 'warning',
    health_score: 72,
    uptime: 98.5,
    response_time: 1200,
    last_check: '5 phút trước',
    total_posts: 89,
    failed_posts: 1,
    created_at: '12/10/2024',
    updated_at: '16/10/2024',
    settings: {
      auth_type: 'app_password',
      credentials: {},
      defaults: {
        tags: ['business'],
        post_status: 'draft',
      },
      seo: {
        auto_canonical: true,
        noindex_drafts: true,
        nofollow_external: false,
      },
      customization: {
        custom_fields: {},
      },
      notifications: {
        events: [],
      },
      timezone: 'Asia/Ho_Chi_Minh',
    },
  },
  {
    id: '3',
    name: 'News Portal',
    url: 'https://newsportal.com',
    favicon: '',
    group_id: '2',
    group_name: 'Blog Network',
    platform: 'custom',
    status: 'error',
    health_status: 'critical',
    health_score: 35,
    uptime: 85.2,
    response_time: 0,
    last_check: '1 giờ trước',
    total_posts: 267,
    failed_posts: 12,
    created_at: '05/10/2024',
    updated_at: '16/10/2024',
    settings: {
      auth_type: 'basic_auth',
      credentials: {},
      defaults: {
        tags: ['news'],
        post_status: 'publish',
      },
      seo: {
        auto_canonical: true,
        noindex_drafts: false,
        nofollow_external: true,
      },
      customization: {
        custom_fields: {},
      },
      notifications: {
        events: [],
      },
      timezone: 'Asia/Ho_Chi_Minh',
    },
  },
];

export default function Websites() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showForm, setShowForm] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | undefined>();
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [showStatistics, setShowStatistics] = useState<Website | null>(null);

  const healthStats: HealthStats = {
    total: mockWebsites.length,
    healthy: mockWebsites.filter(w => w.health_status === 'healthy').length,
    warning: mockWebsites.filter(w => w.health_status === 'warning').length,
    critical: mockWebsites.filter(w => w.health_status === 'critical').length,
  };

  // Filter websites based on selected criteria
  const filteredWebsites = mockWebsites.filter(website => {
    const matchesGroup = selectedGroup === 'all' || website.group_id === selectedGroup;
    return matchesGroup;
  });

  const handleAddWebsite = () => {
    setEditingWebsite(undefined);
    setShowForm(true);
  };

  const handleCreateGroup = () => {
    console.log('Creating new group');
  };

  const handleEditWebsite = (website: Website) => {
    setEditingWebsite(website);
    setShowForm(true);
  };

  const handleSaveWebsite = (websiteData: Partial<Website>) => {
    console.log('Saving website:', websiteData);
    setShowForm(false);
    setEditingWebsite(undefined);
  };

  const handleDeleteWebsite = (websiteId: string) => {
    console.log('Deleting website:', websiteId);
  };

  const handleTestWebsite = (websiteId: string) => {
    console.log('Testing website:', websiteId);
  };

  const handleWebsiteSettings = (websiteId: string) => {
    const website = mockWebsites.find(w => w.id === websiteId);
    if (website) {
      setShowStatistics(website);
    }
  };

  const handleBulkAction = (action: string, websiteIds: string[]) => {
    console.log('Bulk action:', action, websiteIds);
  };

  const handleHealthCheck = () => {
    console.log('Running health check for all websites');
  };

  if (showStatistics) {
    return (
      <WebsiteStatistics
        website={showStatistics}
        onClose={() => setShowStatistics(null)}
      />
    );
  }

  return (
    <div className="flex h-full gap-6">
      {/* Sidebar */}
      <WebsiteGroupSidebar
        groups={mockGroups}
        activeGroup={selectedGroup}
        onGroupChange={setSelectedGroup}
        onCreateGroup={handleCreateGroup}
        totalWebsites={mockWebsites.length}
      />

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">🌐 Quản lý Websites</h1>
            <p className="text-muted-foreground">
              Quản lý và giám sát tất cả websites của bạn
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleCreateGroup}>
              <Users className="w-4 h-4 mr-2" />
              Tạo Nhóm
            </Button>
            <Button onClick={handleAddWebsite}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm Website
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">📊 Tổng quan</TabsTrigger>
            <TabsTrigger value="monitoring">🔍 Giám sát</TabsTrigger>
            <TabsTrigger value="management">⚙️ Quản lý</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <WebsiteStatsCards stats={healthStats} />

            {/* View Mode Selector */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Hiển thị {filteredWebsites.length} / {mockWebsites.length} websites
                </span>
              </div>
            </div>

            {/* Content */}
            <WebsiteTable
              websites={filteredWebsites}
              onEdit={handleEditWebsite}
              onDelete={handleDeleteWebsite}
              onTest={handleTestWebsite}
              onSettings={handleWebsiteSettings}
              onBulkAction={handleBulkAction}
            />
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring">
            <HealthMonitoring
              websites={mockWebsites}
              stats={healthStats}
              onHealthCheck={handleHealthCheck}
            />
          </TabsContent>

          {/* Management Tab */}
          <TabsContent value="management" className="space-y-6">
            <div className="text-center py-12">
              <span className="text-6xl">🚧</span>
              <h3 className="text-xl font-semibold mt-4">Management Tools</h3>
              <p className="text-muted-foreground mt-2">
                Advanced management features coming soon...
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Website Form Modal */}
        {showForm && (
          <AddWebsiteModal
            website={editingWebsite}
            onSave={handleSaveWebsite}
            onClose={() => {
              setShowForm(false);
              setEditingWebsite(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
}
