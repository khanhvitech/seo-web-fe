import React, { useState } from 'react';
import { Website } from '@/types/website';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ArrowLeft, 
  ArrowRight, 
  X, 
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  XCircle,
  RefreshCw,
  Info,
  BookOpen,
  Plus,
  ChevronDown
} from 'lucide-react';

interface AddWebsiteModalProps {
  website?: Website;
  onSave: (website: Partial<Website>) => void;
  onClose: () => void;
}

// Platform definitions
const platforms = [
  { id: 'wordpress', name: 'WordPress', icon: '⚡' },
  { id: 'blogger', name: 'Blogger', icon: '📝' },
  { id: 'joomla', name: 'Joomla', icon: '🌟' },
  { id: 'medium', name: 'Medium', icon: 'Ⓜ️' },
  { id: 'drupal', name: 'Drupal', icon: '💧' },
  { id: 'custom', name: 'Custom API', icon: '⚙️' }
];

// Mock groups
const mockGroups = [
  { id: '1', name: 'Marketing Sites' },
  { id: '2', name: 'Blog Network' },
  { id: '3', name: 'Client Sites' }
];

function AddWebsiteModal({ website, onSave, onClose }: AddWebsiteModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [connectionError, setConnectionError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: website?.name || '',
    url: website?.url || '',
    group_id: website?.group_id || '',
    description: '',
    platform: website?.platform || 'wordpress',
    api_endpoint: '',
    auth_type: 'app_password',
    username: '',
    password: '',
    api_key: '',
    blog_id: '',
    custom_headers: '{\n  "Content-Type": "application/json"\n}',
    default_category: '',
    default_tags: ['seo', 'marketing'],
    default_author: '',
    post_status: 'publish',
    auto_seo: true,
    auto_image_optimize: true,
    auto_excerpt: false,
    add_watermark: false,
    timezone: 'Asia/Ho_Chi_Minh',
    notify_success: true,
    notify_error: true,
    webhook_notification: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Tên website phải có ít nhất 2 ký tự';
    } else if (formData.name.length > 200) {
      newErrors.name = 'Tên website không được quá 200 ký tự';
    }
    
    if (!formData.url.trim()) {
      newErrors.url = 'URL website là bắt buộc';
    } else if (!formData.url.match(/^https?:\/\/.+/)) {
      newErrors.url = 'URL phải bắt đầu bằng http:// hoặc https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    return connectionStatus === 'success';
  };

  React.useEffect(() => {
    if (formData.url && formData.platform === 'wordpress') {
      const cleanUrl = formData.url.replace(/\/$/, '');
      updateFormData('api_endpoint', `${cleanUrl}/wp-json/`);
    }
  }, [formData.url, formData.platform]);

  const testConnection = async () => {
    setConnectionStatus('testing');
    setConnectionError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (formData.platform === 'wordpress') {
        if (!formData.username || !formData.password) {
          throw new Error('Username và password là bắt buộc');
        }
        if (formData.username === 'admin' && formData.password === 'wrong') {
          throw new Error('Thông tin đăng nhập không chính xác');
        }
      }
      
      setConnectionStatus('success');
    } catch (error: any) {
      setConnectionStatus('error');
      setConnectionError(error.message);
    }
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const websiteData: Partial<Website> = {
        name: formData.name,
        url: formData.url,
        group_id: formData.group_id,
        platform: formData.platform as any,
        status: 'active',
        health_status: 'healthy',
        settings: {
          auth_type: formData.auth_type as any,
          credentials: {},
          defaults: {
            tags: formData.default_tags,
            post_status: formData.post_status as any
          },
          seo: {
            auto_canonical: formData.auto_seo,
            noindex_drafts: formData.auto_seo,
            nofollow_external: false
          },
          notifications: {
            webhook_url: '',
            events: formData.notify_success ? ['success'] : []
          },
          customization: {
            title_prefix: '',
            title_suffix: '',
            custom_fields: {}
          },
          timezone: formData.timezone
        }
      };
      
      onSave(websiteData);
    } catch (error) {
      console.error('Error saving website:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !formData.default_tags.includes(tag)) {
      updateFormData('default_tags', [...formData.default_tags, tag]);
    }
  };

  const removeTag = (index: number) => {
    updateFormData('default_tags', formData.default_tags.filter((_, i) => i !== index));
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Thông tin cơ bản';
      case 2: return 'Kết nối Platform';
      case 3: return 'Cấu hình';
      default: return '';
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] max-h-[90vh] w-[95vw] p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousStep}
                  className="h-8 w-8 p-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <DialogTitle className="text-xl font-semibold">
                {website ? 'Chỉnh sửa Website' : 'Thêm Website Mới'}
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-4">
            <div className="text-sm text-muted-foreground mb-2">
              Step {currentStep} of 3: {getStepTitle()}
            </div>
            
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-1">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                      step <= currentStep 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`flex-1 h-1 rounded-full transition-colors ${
                        step < currentStep ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            {/* Step labels */}
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>Thông tin</span>
              <span>Kết nối</span>
              <span>Cấu hình</span>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Thông tin cơ bản</h3>
                  <p className="text-sm text-muted-foreground">
                    Nhập thông tin cơ bản về website của bạn
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Website Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      📝 Tên Website *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder="My Personal Blog"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name ? (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Tên hiển thị trong danh sách
                      </p>
                    )}
                  </div>

                  {/* Website URL */}
                  <div className="space-y-2">
                    <Label htmlFor="url" className="text-sm font-medium">
                      🌐 URL Website *
                    </Label>
                    <Input
                      id="url"
                      value={formData.url}
                      onChange={(e) => updateFormData('url', e.target.value)}
                      placeholder="https://myblog.com"
                      className={errors.url ? 'border-red-500' : ''}
                    />
                    {errors.url ? (
                      <p className="text-sm text-red-500">{errors.url}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        URL đầy đủ của website
                      </p>
                    )}
                  </div>

                  {/* Group Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="group" className="text-sm font-medium">
                      📁 Nhóm Website
                    </Label>
                    <Select value={formData.group_id} onValueChange={(value) => updateFormData('group_id', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhóm..." />
                      </SelectTrigger>
                      <SelectContent>
                        {mockGroups.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button variant="ghost" size="sm" className="text-primary">
                      <Plus className="w-4 h-4 mr-1" />
                      Tạo nhóm mới
                    </Button>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      📝 Mô tả (Tùy chọn)
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      placeholder="Mô tả về website này..."
                      rows={3}
                      maxLength={500}
                    />
                    <p className="text-sm text-muted-foreground">
                      {formData.description.length}/500 ký tự
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Platform Connection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Kết nối Platform</h3>
                  <p className="text-sm text-muted-foreground">
                    Chọn platform và cấu hình kết nối
                  </p>
                </div>

                {/* Platform Selection */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">🔧 Chọn Platform *</Label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {platforms.map((platform) => (
                      <Card
                        key={platform.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          formData.platform === platform.id
                            ? 'border-primary shadow-md bg-primary/5'
                            : 'border-border'
                        }`}
                        onClick={() => updateFormData('platform', platform.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">{platform.icon}</div>
                          <div className="text-sm font-medium">{platform.name}</div>
                          {formData.platform === platform.id && (
                            <div className="mt-2">
                              <Badge variant="default" className="text-xs">
                                ● Selected
                              </Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Platform Connection Forms */}
                {formData.platform && (
                  <Card>
                    <CardContent className="p-6">
                      {/* WordPress Connection */}
                      {formData.platform === 'wordpress' && (
                        <div className="space-y-4">
                          <h4 className="font-medium border-b pb-2">WordPress Connection</h4>
                          
                          {/* API Endpoint */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">📡 API Endpoint</Label>
                            <div className="flex gap-2">
                              <Input
                                value={formData.api_endpoint}
                                onChange={(e) => updateFormData('api_endpoint', e.target.value)}
                                placeholder="https://myblog.com/wp-json/"
                              />
                              <Button variant="outline" size="sm">
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              Auto-detected
                            </div>
                          </div>

                          {/* Credentials */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">👤 Username *</Label>
                              <Input
                                value={formData.username}
                                onChange={(e) => updateFormData('username', e.target.value)}
                                placeholder="admin"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">🔑 Application Password *</Label>
                              <div className="relative">
                                <Input
                                  type={showPassword ? 'text' : 'password'}
                                  value={formData.password}
                                  onChange={(e) => updateFormData('password', e.target.value)}
                                  placeholder="••••••••••••••••••••••••••••••••••••••••"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Help Section */}
                          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                              <div className="text-sm">
                                <p className="font-medium text-blue-900 dark:text-blue-100">
                                  ℹ️ Hướng dẫn tạo Application Password:
                                </p>
                                <p className="text-blue-700 dark:text-blue-200 mt-1">
                                  WP Admin → Users → Your Profile → Application Passwords
                                </p>
                                <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600">
                                  <BookOpen className="w-4 h-4 mr-1" />
                                  📖 Xem hướng dẫn chi tiết
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Test Connection */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <Button onClick={testConnection} disabled={connectionStatus === 'testing'}>
                          {connectionStatus === 'testing' ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              🔍 Testing...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              🔍 Test Connection
                            </>
                          )}
                        </Button>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          {connectionStatus === 'testing' && (
                            <Badge variant="secondary">⏳ Testing...</Badge>
                          )}
                          {connectionStatus === 'success' && (
                            <Badge variant="default" className="bg-green-600">
                              ✅ Connected
                            </Badge>
                          )}
                          {connectionStatus === 'error' && (
                            <Badge variant="destructive">❌ Failed</Badge>
                          )}
                          {connectionStatus === 'idle' && (
                            <Badge variant="outline">⏳ Pending</Badge>
                          )}
                        </div>
                      </div>

                      {/* Connection Results */}
                      {connectionStatus === 'success' && (
                        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium text-green-900 dark:text-green-100">
                                ✅ Kết nối thành công!
                              </p>
                              <div className="text-green-700 dark:text-green-200 mt-2 space-y-1">
                                <div>Website: {formData.name || 'My Personal Blog'}</div>
                                <div>Version: WordPress 6.4</div>
                                <div>API: REST API v2</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {connectionStatus === 'error' && (
                        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                          <div className="flex items-start gap-2">
                            <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium text-red-900 dark:text-red-100">
                                ❌ Kết nối thất bại
                              </p>
                              <p className="text-red-700 dark:text-red-200 mt-1">
                                Error: {connectionError || 'Unknown error'}
                              </p>
                              <div className="text-red-600 dark:text-red-300 mt-2 space-y-1">
                                <div>• Check username and password</div>
                                <div>• Verify API endpoint is correct</div>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button variant="outline" size="sm">Retry</Button>
                                <Button variant="ghost" size="sm" className="p-0 h-auto text-red-600">
                                  View troubleshooting guide
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 3: Configuration */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Cài đặt & Cấu hình</h3>
                  <p className="text-sm text-muted-foreground">
                    Cấu hình các tùy chọn mặc định cho website
                  </p>
                </div>

                {/* Content Defaults */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0">
                      <h4 className="font-medium">📂 Cài đặt Nội dung Mặc định</h4>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div>
                          <Label className="text-sm font-medium">🏷️ Tags mặc định</Label>
                          <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
                            {formData.default_tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 ml-1"
                                  onClick={() => removeTag(index)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </Badge>
                            ))}
                            <Input
                              placeholder="Nhập tag và Enter..."
                              className="border-0 p-0 h-6 flex-1 min-w-[120px] text-xs"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const input = e.target as HTMLInputElement;
                                  addTag(input.value.trim());
                                  input.value = '';
                                }
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">👤 Author mặc định</Label>
                          <Select value={formData.default_author} onValueChange={(value) => updateFormData('default_author', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn author..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="author">Author</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>

                {/* Auto Optimization */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0">
                      <h4 className="font-medium">⚡ Tối ưu Tự động</h4>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium text-sm">✅ Tự động tối ưu SEO</div>
                            <div className="text-xs text-muted-foreground">
                              Auto meta tags, canonical URL, sitemap
                            </div>
                          </div>
                          <Switch
                            checked={formData.auto_seo}
                            onCheckedChange={(checked) => updateFormData('auto_seo', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium text-sm">✅ Tự động tối ưu ảnh</div>
                            <div className="text-xs text-muted-foreground">
                              Compress, resize, lazy load, WebP format
                            </div>
                          </div>
                          <Switch
                            checked={formData.auto_image_optimize}
                            onCheckedChange={(checked) => updateFormData('auto_image_optimize', checked)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-background p-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onClose}>
              Hủy
            </Button>
            
            <div className="flex items-center gap-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={goToPreviousStep}>
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Quay lại
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button 
                  onClick={goToNextStep}
                  disabled={currentStep === 2 && connectionStatus !== 'success'}
                >
                  Tiếp theo
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      Hoàn thành
                      <CheckCircle className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { AddWebsiteModal };
export default AddWebsiteModal;
