import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  X, 
  Save, 
  CheckCircle, 
  Calendar, 
  Trash2, 
  Upload, 
  Image as ImageIcon,
  Target,
  Globe
} from "lucide-react";

interface ContentFormProps {
  onClose: () => void;
  editingContent?: any;
}

export function ContentForm({ onClose, editingContent }: ContentFormProps) {
  const [formData, setFormData] = useState({
    title: editingContent?.title || '',
    slug: editingContent?.slug || '',
    content: editingContent?.content || '',
    excerpt: editingContent?.excerpt || '',
    focusKeyword: editingContent?.focus_keyword || '',
    metaTitle: editingContent?.meta_title || '',
    metaDescription: editingContent?.meta_description || '',
    categories: editingContent?.categories || [],
    tags: editingContent?.tags || [],
    language: editingContent?.language || 'vi',
    contentType: editingContent?.content_type || 'article',
    sourceUrl: editingContent?.source_url || '',
    status: editingContent?.status || 'draft',
    publishAt: editingContent?.published_at || ''
  });

  const [wordCount, setWordCount] = useState(editingContent?.word_count || 0);
  const [readingTime, setReadingTime] = useState(Math.ceil((editingContent?.word_count || 0) / 200));
  const [seoScore, setSeoScore] = useState(editingContent?.seo_score || 0);

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
    const words = content.trim().split(/\s+/).length;
    setWordCount(words);
    setReadingTime(Math.ceil(words / 200)); // 200 words per minute
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {editingContent ? 'Chỉnh sửa nội dung' : 'Tạo nội dung mới'}
            </h2>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Nội dung chính</TabsTrigger>
              <TabsTrigger value="seo">Cài đặt SEO</TabsTrigger>
              <TabsTrigger value="categorize">Phân loại</TabsTrigger>
              <TabsTrigger value="settings">Cài đặt</TabsTrigger>
            </TabsList>

            {/* Tab 1: Nội dung chính */}
            <TabsContent value="content" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    placeholder="Nhập tiêu đề bài viết..."
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    placeholder="url-friendly-slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="content">Nội dung</Label>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{wordCount} từ</span>
                      <span>{readingTime} phút đọc</span>
                    </div>
                  </div>
                  <Textarea
                    id="content"
                    placeholder="Viết nội dung của bạn tại đây..."
                    value={formData.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="min-h-[400px] resize-none"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <strong>B</strong>
                    </Button>
                    <Button variant="outline" size="sm">
                      <em>I</em>
                    </Button>
                    <Button variant="outline" size="sm">
                      Link
                    </Button>
                    <Button variant="outline" size="sm">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Video
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Ảnh đại diện</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Kéo thả ảnh vào đây hoặc <Button variant="ghost" className="p-0 h-auto text-blue-600 underline">chọn từ thư viện</Button>
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Trích dẫn ngắn</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Mô tả ngắn về bài viết..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Cài đặt SEO */}
            <TabsContent value="seo" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="focusKeyword">Focus Keyword</Label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="focusKeyword"
                      placeholder="Từ khóa chính..."
                      value={formData.focusKeyword}
                      onChange={(e) => setFormData(prev => ({ ...prev, focusKeyword: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="metaTitle">Meta Title (max 60 ký tự)</Label>
                  <Input
                    id="metaTitle"
                    placeholder="Tiêu đề SEO..."
                    value={formData.metaTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                    maxLength={60}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {formData.metaTitle.length}/60 ký tự
                  </div>
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description (max 160 ký tự)</Label>
                  <Textarea
                    id="metaDescription"
                    placeholder="Mô tả SEO..."
                    value={formData.metaDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                    maxLength={160}
                    rows={3}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {formData.metaDescription.length}/160 ký tự
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">SEO Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span>Điểm SEO tổng thể</span>
                      <span className={`font-bold ${seoScore >= 80 ? 'text-green-600' : seoScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {seoScore}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${seoScore >= 80 ? 'bg-green-600' : seoScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`}
                        style={{ width: `${seoScore}%` }}
                      ></div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Focus keyword xuất hiện trong tiêu đề</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Meta description đã được điền</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-600" />
                        <span>Cần thêm ảnh alt text</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Tab 3: Phân loại */}
            <TabsContent value="categorize" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Danh mục</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seo">SEO</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="content">Content Marketing</SelectItem>
                      <SelectItem value="wordpress">WordPress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Nhập tags, phân cách bằng dấu phẩy..."
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                        <button className="ml-1 hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Ngôn ngữ</Label>
                  <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* Tab 4: Cài đặt */}
            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Loại nội dung</Label>
                  <Select value={formData.contentType} onValueChange={(value) => setFormData(prev => ({ ...prev, contentType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="infographic">Infographic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sourceUrl">URL nguồn (nếu có)</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="sourceUrl"
                      placeholder="https://..."
                      value={formData.sourceUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, sourceUrl: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>Trạng thái xuất bản</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Bài nháp</SelectItem>
                      <SelectItem value="ready">Sẵn sàng</SelectItem>
                      <SelectItem value="published">Xuất bản ngay</SelectItem>
                      <SelectItem value="scheduled">Lên lịch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.status === 'scheduled' && (
                  <div>
                    <Label htmlFor="publishAt">Thời gian xuất bản</Label>
                    <Input
                      id="publishAt"
                      type="datetime-local"
                      value={formData.publishAt}
                      onChange={(e) => setFormData(prev => ({ ...prev, publishAt: e.target.value }))}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Sidebar */}
      <Card className="w-80 rounded-none border-l border-r-0 border-t-0 border-b-0">
        <CardHeader>
          <CardTitle className="text-lg">Hành động</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Trạng thái hiện tại: </span>
              <Badge variant="secondary">Bài nháp</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Lần cập nhật cuối: Chưa lưu
            </div>
          </div>

          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Lưu nháp
            </Button>
            <Button className="w-full" variant="default">
              <CheckCircle className="w-4 h-4 mr-2" />
              Sẵn sàng
            </Button>
            <Button className="w-full" variant="default">
              Xuất bản ngay
            </Button>
            <Button className="w-full" variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Lên lịch
            </Button>
          </div>

          <div className="border-t pt-4">
            <Button className="w-full" variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa
            </Button>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Lịch sử phiên bản</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Phiên bản 1</span>
                <span className="text-muted-foreground">Vừa tạo</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
