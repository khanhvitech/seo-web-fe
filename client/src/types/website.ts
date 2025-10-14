export interface Website {
  id: string;
  name: string;
  url: string;
  favicon?: string;
  group_id: string;
  group_name: string;
  platform: 'wordpress' | 'blogger' | 'joomla' | 'custom';
  platform_version?: string;
  status: 'active' | 'inactive' | 'error';
  health_status: 'healthy' | 'warning' | 'critical';
  health_score: number; // 0-100
  uptime: number; // percentage
  response_time: number; // milliseconds
  last_check: string;
  last_successful_post?: string;
  total_posts: number;
  failed_posts: number;
  created_at: string;
  updated_at: string;
  settings: WebsiteSettings;
}

export interface WebsiteSettings {
  api_endpoint?: string;
  auth_type: 'app_password' | 'oauth' | 'basic_auth';
  credentials: {
    username?: string;
    password?: string;
    token?: string;
  };
  defaults: {
    category?: string;
    tags: string[];
    author?: string;
    post_status: 'draft' | 'publish' | 'pending';
  };
  seo: {
    auto_canonical: boolean;
    noindex_drafts: boolean;
    nofollow_external: boolean;
  };
  customization: {
    title_prefix?: string;
    title_suffix?: string;
    content_footer?: string;
    custom_fields: { [key: string]: string };
  };
  notifications: {
    webhook_url?: string;
    events: string[];
  };
  timezone: string;
}

export interface SiteGroup {
  id: string;
  name: string;
  description?: string;
  color: string;
  website_count: number;
  settings?: Partial<WebsiteSettings>;
}

export interface HealthStats {
  total: number;
  healthy: number;
  warning: number;
  critical: number;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  site_count: number;
  supported_features: string[];
}
