import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Search, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Website, SiteGroup } from "@/types/website";

interface SimpleWebsiteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (website: Partial<Website>) => void;
  website?: Website;
}

type PlatformType = 'wordpress' | 'blogger' | 'joomla' | 'medium' | 'drupal' | 'custom';
type ConnectionStatus = 'idle' | 'testing' | 'success' | 'error';

interface ConnectionResult {
  status: ConnectionStatus;
  message?: string;
  platformInfo?: {
    name: string;
    version: string;
  };
}

const PLATFORMS = [
  { id: 'wordpress', name: 'WordPress', icon: 'ⓦ', color: '#21759B' },
  { id: 'blogger', name: 'Blogger', icon: 'ⓑ', color: '#FF5722' },
  { id: 'joomla', name: 'Joomla', icon: 'ⓙ', color: '#5091CD' },
  { id: 'medium', name: 'Medium', icon: 'ⓜ', color: '#00AB6C' },
  { id: 'drupal', name: 'Drupal', icon: 'ⓓ', color: '#0077C0' },
  { id: 'custom', name: 'Custom API', icon: '⚙️', color: '#6B7280' },
];

const PLATFORM_CONFIGS = {
  wordpress: {
    endpoint: '/wp-json/',
    hint: 'Tạo Application Password tại WP Admin → Users → Your Profile'
  },
  blogger: {
    endpoint: 'https://www.googleapis.com/blogger/v3/',
    hint: 'Lấy API Key tại Google Cloud Console'
  },
  joomla: {
    endpoint: '/api/',
    hint: 'Tạo API Token tại System → Manage → API Tokens'
  },
  medium: {
    endpoint: 'https://api.medium.com/v1/',
    hint: 'Lấy token tại Settings → Integration tokens'
  },
  drupal: {
    endpoint: '/jsonapi/',
    hint: 'Cần bật JSON:API module'
  },
  custom: {
    endpoint: '',
    hint: 'Nhập thông tin theo tài liệu API của bạn'
  }
};

const MOCK_GROUPS: SiteGroup[] = [
  { id: '1', name: 'Blog cá nhân', color: '#3B82F6', website_count: 5 },
  { id: '2', name: 'Website kinh doanh', color: '#10B981', website_count: 3 },
  { id: '3', name: 'Landing pages', color: '#8B5CF6', website_count: 8 },
];

export function SimpleWebsiteModal({ open, onOpenChange, onSave, website }: SimpleWebsiteModalProps) {
  const [formData, setFormData] = useState({
    name: website?.name || '',
    url: website?.url || '',
    site_group_id: website?.group_id || '',
    platform: 'wordpress' as const, // Always WordPress
    api_endpoint: website?.settings?.api_endpoint || '',
    username: website?.settings?.credentials?.username || '',
    password: website?.settings?.credentials?.password || '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [connection, setConnection] = useState<ConnectionResult>({ status: 'idle' });

  // Auto-generate API endpoint when URL or platform changes
  const handleUrlChange = (url: string) => {
    setFormData(prev => {
      const newData = { ...prev, url };
      if (url && prev.platform !== 'custom') {
        const config = PLATFORM_CONFIGS[prev.platform as keyof typeof PLATFORM_CONFIGS];
        if (config && config.endpoint.startsWith('/')) {
          newData.api_endpoint = url.replace(/\/$/, '') + config.endpoint;
        } else {
          newData.api_endpoint = config.endpoint;
        }
      }
      return newData;
    });
  };

  const handlePlatformChange = (platform: PlatformType) => {
    setFormData(prev => {
      const newData = { ...prev, platform };
      const config = PLATFORM_CONFIGS[platform as keyof typeof PLATFORM_CONFIGS];
      
      if (platform === 'custom') {
        newData.api_endpoint = '';
      } else if (prev.url && config.endpoint.startsWith('/')) {
        newData.api_endpoint = prev.url.replace(/\/$/, '') + config.endpoint;
      } else {
        newData.api_endpoint = config.endpoint;
      }
      
      return newData;
    });
    setConnection({ status: 'idle' });
  };

  const testConnection = async () => {
    setConnection({ status: 'testing' });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response
    const isValid = formData.username && formData.password && formData.api_endpoint;
    if (isValid) {
      setConnection({
        status: 'success',
        message: 'Kết nối thành công!',
        platformInfo: {
          name: formData.name || 'My Website',
          version: 'WordPress 6.4'
        }
      });
    } else {
      setConnection({
        status: 'error',
        message: 'Invalid username or password'
      });
    }
  };

  const handleSave = () => {
    const websiteData: Partial<Website> = {
      name: formData.name,
      url: formData.url,
      platform: formData.platform === 'medium' || formData.platform === 'drupal' ? 'custom' : formData.platform,
      group_id: formData.site_group_id || '',
      group_name: MOCK_GROUPS.find(g => g.id === formData.site_group_id)?.name || '',
      settings: {
        api_endpoint: formData.api_endpoint,
        auth_type: 'basic_auth',
        credentials: {
          username: formData.username,
          password: formData.password,
        },
        defaults: {
          tags: [],
          post_status: 'draft'
        },
        seo: {
          auto_canonical: true,
          noindex_drafts: true,
          nofollow_external: false,
        },
        customization: {
          custom_fields: {}
        },
        notifications: {
          events: []
        },
        timezone: 'Asia/Ho_Chi_Minh'
      }
    };
    
    onSave(websiteData);
    onOpenChange(false);
  };

  const isFormValid = formData.name && formData.url && formData.platform && 
                     formData.username && formData.password && formData.api_endpoint;
  const canSave = isFormValid && connection.status === 'success';

  const currentPlatformConfig = PLATFORM_CONFIGS[formData.platform as keyof typeof PLATFORM_CONFIGS];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6 border-b border-gray-200">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Thêm Website Mới
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Section 1: Thông tin Website */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              📝 THÔNG TIN WEBSITE
            </h3>
            
            <div className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Tên Website <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Personal Blog"
                  className="mt-1 h-11"
                />
              </div>

              <div>
                <Label htmlFor="url" className="text-sm font-medium text-gray-700">
                  URL Website <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://myblog.com"
                  className="mt-1 h-11"
                />
              </div>

              <div>
                <Label htmlFor="group" className="text-sm font-medium text-gray-700">
                  Nhóm Website
                </Label>
                <Select value={formData.site_group_id} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, site_group_id: value }))
                }>
                  <SelectTrigger className="mt-1 h-11">
                    <SelectValue placeholder="-- Chọn nhóm --" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_GROUPS.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: group.color }}
                          />
                          {group.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
                  + Tạo nhóm mới
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Chọn Platform */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              🔧 CHỌN PLATFORM
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformChange(platform.id as PlatformType)}
                  className={`
                    relative p-4 rounded-lg border-2 transition-all duration-200 h-24
                    flex flex-col items-center justify-center text-center
                    ${formData.platform === platform.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                    }
                  `}
                >
                  <div className="text-2xl mb-1">{platform.icon}</div>
                  <div className="text-sm font-medium text-gray-900">{platform.name}</div>
                  {formData.platform === platform.id && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Thông tin Kết nối */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              🔐 THÔNG TIN KẾT NỐI
            </h3>
            
            <div className="space-y-5">
              <div>
                <Label htmlFor="api_endpoint" className="text-sm font-medium text-gray-700">
                  API Endpoint
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="api_endpoint"
                    value={formData.api_endpoint}
                    onChange={(e) => setFormData(prev => ({ ...prev, api_endpoint: e.target.value }))}
                    placeholder="https://myblog.com/wp-json/"
                    className="h-11 pr-20"
                    disabled={formData.platform !== 'custom'}
                  />
                  {formData.platform !== 'custom' && (
                    <Badge variant="secondary" className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                      ✅ Auto-detected
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="admin"
                  className="mt-1 h-11"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password / API Key <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"
                    className="h-11 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {currentPlatformConfig?.hint && (
                  <p className="text-xs text-gray-600 mt-1">
                    💡 {currentPlatformConfig.hint}
                  </p>
                )}
              </div>

              {/* Test Connection */}
              <div className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <Button
                    onClick={testConnection}
                    disabled={!isFormValid || connection.status === 'testing'}
                    variant={connection.status === 'success' ? 'default' : 'outline'}
                    className={`
                      ${connection.status === 'success' ? 'bg-green-600 hover:bg-green-700' : ''}
                      ${connection.status === 'error' ? 'border-red-300 text-red-700' : ''}
                    `}
                  >
                    {connection.status === 'testing' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {connection.status === 'success' && <CheckCircle className="w-4 h-4 mr-2" />}
                    {connection.status === 'error' && <XCircle className="w-4 h-4 mr-2" />}
                    {connection.status === 'idle' && <Search className="w-4 h-4 mr-2" />}
                    
                    {connection.status === 'testing' && 'Đang kiểm tra...'}
                    {connection.status === 'success' && 'Đã kết nối'}
                    {connection.status === 'error' && 'Thất bại'}
                    {connection.status === 'idle' && 'Test Connection'}
                  </Button>
                  
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 mr-2">Status:</span>
                    {connection.status === 'testing' && <span className="text-yellow-600">⏳</span>}
                    {connection.status === 'success' && <span className="text-green-600">✅</span>}
                    {connection.status === 'error' && <span className="text-red-600">❌</span>}
                    {connection.status === 'idle' && <span className="text-gray-400">⭕</span>}
                  </div>
                </div>

                {connection.status === 'testing' && (
                  <p className="text-sm text-gray-600">Đang kiểm tra kết nối...</p>
                )}

                {connection.status === 'success' && (
                  <div className="text-sm">
                    <p className="text-green-700 font-medium">✅ {connection.message}</p>
                    {connection.platformInfo && (
                      <div className="mt-1 text-gray-600">
                        <p>Website: {connection.platformInfo.name}</p>
                        <p>Platform: {connection.platformInfo.version}</p>
                      </div>
                    )}
                  </div>
                )}

                {connection.status === 'error' && (
                  <div className="text-sm">
                    <p className="text-red-700 font-medium">❌ Không thể kết nối</p>
                    <p className="text-red-600 mt-1">Lỗi: {connection.message}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={testConnection}>
                        Thử lại
                      </Button>
                      <Button size="sm" variant="ghost">
                        Xem hướng dẫn
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!canSave}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Thêm Website
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}