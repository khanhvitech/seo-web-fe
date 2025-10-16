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

type ConnectionStatus = 'idle' | 'testing' | 'success' | 'error';

interface ConnectionResult {
  status: ConnectionStatus;
  message?: string;
  platformInfo?: {
    name: string;
    version: string;
  };
}

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
    api_endpoint: website?.settings?.api_endpoint || '',
    username: website?.settings?.credentials?.username || '',
    password: website?.settings?.credentials?.password || '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [connection, setConnection] = useState<ConnectionResult>({ status: 'idle' });

  // Auto-generate API endpoint when URL changes (WordPress only)
  const handleUrlChange = (url: string) => {
    setFormData(prev => {
      const newData = { ...prev, url };
      if (url) {
        try {
          const urlObj = new URL(url);
          newData.api_endpoint = `${urlObj.origin}/wp-json/`;
        } catch {
          newData.api_endpoint = url.endsWith('/') ? `${url}wp-json/` : `${url}/wp-json/`;
        }
      }
      return newData;
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const testConnection = async () => {
    const isValid = formData.username && formData.password && formData.api_endpoint;
    if (!isValid) return;

    setConnection({ status: 'testing' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success response
      setConnection({
        status: 'success',
        message: 'Kết nối thành công!',
        platformInfo: {
          name: formData.name || 'My Website',
          version: 'WordPress 6.4'
        }
      });
    } catch (error) {
      setConnection({
        status: 'error',
        message: 'Không thể kết nối. Kiểm tra lại thông tin đăng nhập.'
      });
    }
  };

  const handleSubmit = () => {
    const websiteData: Partial<Website> = {
      name: formData.name,
      url: formData.url,
      platform: 'wordpress',
      group_id: formData.site_group_id || '',
      group_name: MOCK_GROUPS.find(g => g.id === formData.site_group_id)?.name || '',
      settings: {
        api_endpoint: formData.api_endpoint,
        auth_type: 'app_password',
        credentials: {
          username: formData.username,
          password: formData.password,
        },
        defaults: {
          tags: [],
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
    };

    onSave(websiteData);
    onOpenChange(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      url: '',
      site_group_id: '',
      api_endpoint: '',
      username: '',
      password: '',
    });
    setConnection({ status: 'idle' });
  };

  const canSubmit = formData.name && formData.url && formData.username && formData.password && connection.status === 'success';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {website ? 'Chỉnh sửa Website' : 'Thêm Website WordPress'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Section 1: Website Information */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              📝 Thông tin Website
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tên Website *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="My Personal Blog"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="url">URL Website *</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://myblog.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="group">Nhóm Website</Label>
                <Select value={formData.site_group_id} onValueChange={(value) => handleInputChange('site_group_id', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="-- Chọn nhóm --" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_GROUPS.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: group.color }}
                          />
                          {group.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" className="p-0 h-auto text-blue-600 text-sm mt-1">
                  + Tạo nhóm mới
                </Button>
              </div>
            </div>
          </div>

          {/* Section 2: Connection Information */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              🔐 Thông tin kết nối
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="api_endpoint">API Endpoint</Label>
                <div className="relative mt-1">
                  <Input
                    id="api_endpoint"
                    value={formData.api_endpoint}
                    onChange={(e) => handleInputChange('api_endpoint', e.target.value)}
                    placeholder="https://myblog.com/wp-json/"
                  />
                  {formData.api_endpoint && (
                    <Badge variant="secondary" className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                      ✅ Auto-detected
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="admin"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Application Password *</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  💡 Tạo Application Password tại WP Admin → Users → Your Profile
                </p>
              </div>

              {/* Test Connection */}
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Button
                    onClick={testConnection}
                    disabled={!formData.username || !formData.password || !formData.api_endpoint || connection.status === 'testing'}
                    className="flex items-center gap-2"
                  >
                    {connection.status === 'testing' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    {connection.status === 'testing' ? 'Đang kiểm tra...' : 'Test Connection'}
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    {connection.status === 'idle' && <span className="text-gray-500">⏳</span>}
                    {connection.status === 'testing' && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                    {connection.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {connection.status === 'error' && <XCircle className="w-4 h-4 text-red-500" />}
                  </div>
                </div>

                {connection.status === 'testing' && (
                  <div className="text-sm text-blue-600">
                    ⏳ Đang kiểm tra kết nối...
                  </div>
                )}

                {connection.status === 'success' && (
                  <div className="text-sm text-green-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">{connection.message}</span>
                    </div>
                    {connection.platformInfo && (
                      <div className="ml-6 space-y-1">
                        <div>Website: {connection.platformInfo.name}</div>
                        <div>Platform: {connection.platformInfo.version}</div>
                      </div>
                    )}
                  </div>
                )}

                {connection.status === 'error' && (
                  <div className="text-sm text-red-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      <span className="font-medium">❌ Không thể kết nối</span>
                    </div>
                    <div className="ml-6">
                      Lỗi: {connection.message}
                    </div>
                    <div className="ml-6 flex gap-2">
                      <Button size="sm" variant="outline" onClick={testConnection}>
                        Thử lại
                      </Button>
                      <Button size="sm" variant="ghost" className="text-blue-600">
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
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            {website ? 'Cập nhật Website' : 'Thêm Website'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}