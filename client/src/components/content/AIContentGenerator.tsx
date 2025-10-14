import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Bot, 
  Copy, 
  Save, 
  Download,
  FileText,
  Loader2,
  CheckCircle,
  Lightbulb,
  Target,
  Clock
} from "lucide-react";

export function AIContentGenerator() {
  const [contentType, setContentType] = useState('article');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [wordCount, setWordCount] = useState([800]);
  const [tone, setTone] = useState('professional');
  const [audience, setAudience] = useState('general');
  const [outline, setOutline] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [contentHistory, setContentHistory] = useState<any[]>([]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      const newContent = {
        id: Date.now(),
        type: contentType,
        topic,
        keywords,
        wordCount: wordCount[0],
        tone,
        audience,
        content: generateSampleContent(),
        createdAt: new Date().toISOString()
      };
      setGeneratedContent(newContent.content);
      setContentHistory(prev => [newContent, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  const generateSampleContent = () => {
    return `# ${topic}

## Giới thiệu

${topic} là một chủ đề quan trọng trong thời đại hiện nay. Với sự phát triển không ngừng của công nghệ và xã hội, việc hiểu rõ về ${topic} trở nên cần thiết hơn bao giờ hết.

## Nội dung chính

### 1. Tổng quan về ${topic}

Từ khóa chính: ${keywords}

${topic} đã trải qua nhiều giai đoạn phát triển và đã tạo ra những tác động tích cực đến cuộc sống của chúng ta. Để hiểu rõ hơn về vấn đề này, chúng ta cần xem xét từ nhiều góc độ khác nhau.

### 2. Tầm quan trọng

- Ảnh hưởng tích cực đến xã hội
- Mang lại giá trị thiết thực
- Tạo cơ hội phát triển mới
- Giải quyết các vấn đề thực tế

### 3. Ứng dụng thực tế

${topic} có thể được áp dụng trong nhiều lĩnh vực khác nhau:

1. **Lĩnh vực công nghệ**: Tạo ra những giải pháp sáng tạo
2. **Lĩnh vực giáo dục**: Cải thiện phương pháp học tập
3. **Lĩnh vực kinh doanh**: Tối ưu hóa quy trình làm việc
4. **Lĩnh vực đời sống**: Nâng cao chất lượng cuộc sống

## Kết luận

Tóm lại, ${topic} đóng vai trò quan trọng trong việc định hình tương lai. Chúng ta cần tiếp tục nghiên cứu và phát triển để tận dụng tối đa những lợi ích mà ${topic} mang lại.

---

*Bài viết này được tạo bằng AI với ${wordCount[0]} từ, hướng đến đối tượng ${audience} với tông giọng ${tone}.*`;
  };

  const contentTypeOptions = [
    { value: 'article', label: 'Bài viết' },
    { value: 'blog', label: 'Blog post' },
    { value: 'news', label: 'Tin tức' },
    { value: 'review', label: 'Đánh giá' },
    { value: 'guide', label: 'Hướng dẫn' },
    { value: 'listicle', label: 'Danh sách' }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Chuyên nghiệp' },
    { value: 'friendly', label: 'Thân thiện' },
    { value: 'formal', label: 'Trang trọng' },
    { value: 'casual', label: 'Thường ngày' },
    { value: 'persuasive', label: 'Thuyết phục' },
    { value: 'informative', label: 'Thông tin' }
  ];

  const audienceOptions = [
    { value: 'general', label: 'Đại chúng' },
    { value: 'professional', label: 'Chuyên nghiệp' },
    { value: 'students', label: 'Sinh viên' },
    { value: 'beginners', label: 'Người mới bắt đầu' },
    { value: 'experts', label: 'Chuyên gia' },
    { value: 'business', label: 'Doanh nghiệp' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Tạo bài viết từ AI</h2>
        <p className="text-muted-foreground">Tạo nội dung chất lượng cao một cách tự động bằng AI</p>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">Tạo nội dung</TabsTrigger>
          <TabsTrigger value="history">Lịch sử ({contentHistory.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Settings Panel */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Cài đặt tạo nội dung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contentType">Loại nội dung</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Chủ đề *</Label>
                  <Input
                    id="topic"
                    placeholder="Ví dụ: Trí tuệ nhân tạo trong giáo dục"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Từ khóa (phân cách bằng dấu phẩy)</Label>
                  <Input
                    id="keywords"
                    placeholder="AI, giáo dục, công nghệ"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Số từ: {wordCount[0]}</Label>
                  <Slider
                    value={wordCount}
                    onValueChange={setWordCount}
                    max={2000}
                    min={200}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>200</span>
                    <span>2000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tông giọng</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Đối tượng đọc</Label>
                  <Select value={audience} onValueChange={setAudience}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {audienceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outline">Dàn ý (tùy chọn)</Label>
                  <Textarea
                    id="outline"
                    placeholder="1. Giới thiệu
2. Nội dung chính
3. Kết luận"
                    value={outline}
                    onChange={(e) => setOutline(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={handleGenerate} 
                  disabled={!topic.trim() || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang tạo...
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4 mr-2" />
                      Tạo nội dung
                    </>
                  )}
                </Button>

                {isGenerating && (
                  <div className="text-sm text-muted-foreground text-center">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Thời gian ước tính: 3-5 giây
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generated Content */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Nội dung được tạo
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="space-y-4">
                    <Textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      rows={20}
                      className="min-h-[500px] font-mono text-sm"
                    />
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Số từ: {generatedContent.trim().split(/\s+/).filter(word => word).length}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4 mr-2" />
                          Sao chép
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Tải xuống
                        </Button>
                        <Button size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Lưu bài viết
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[500px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Nội dung AI sẽ xuất hiện ở đây</p>
                      <p className="text-sm">Nhập chủ đề và nhấn "Tạo nội dung"</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {contentHistory.length === 0 ? (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Bot className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Chưa có lịch sử tạo nội dung</p>
                <p className="text-sm">Các bài viết đã tạo sẽ được lưu ở đây</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {contentHistory.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{item.type}</Badge>
                        <Badge variant="outline">{item.tone}</Badge>
                        <Badge variant="outline">{item.wordCount} từ</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    <h3 className="font-medium mb-2">{item.topic}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.content.substring(0, 200)}...
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-2" />
                        Sao chép
                      </Button>
                      <Button variant="outline" size="sm">
                        Xem đầy đủ
                      </Button>
                      <Button size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        Lưu bài viết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
