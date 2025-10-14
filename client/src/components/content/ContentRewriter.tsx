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
import { 
  RefreshCw, 
  Copy, 
  Save, 
  Download,
  FileText,
  Loader2,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export function ContentRewriter() {
  const [originalContent, setOriginalContent] = useState('');
  const [rewriteStyle, setRewriteStyle] = useState('improve');
  const [targetAudience, setTargetAudience] = useState('general');
  const [tone, setTone] = useState('professional');
  const [isRewriting, setIsRewriting] = useState(false);
  const [rewrittenContent, setRewrittenContent] = useState('');
  const [rewriteHistory, setRewriteHistory] = useState<any[]>([]);

  const handleRewrite = async () => {
    if (!originalContent.trim()) return;
    
    setIsRewriting(true);
    // Simulate API call
    setTimeout(() => {
      const newRewrite = {
        id: Date.now(),
        original: originalContent,
        rewritten: `Đây là phiên bản viết lại của nội dung gốc với phong cách ${rewriteStyle}, hướng đến đối tượng ${targetAudience} với tông giọng ${tone}. Nội dung được cải thiện về mặt SEO, dễ đọc và hấp dẫn hơn.\n\n${originalContent.split('.').map(sentence => 
          sentence.trim() ? `${sentence.trim()}.` : ''
        ).filter(s => s).join(' ')}\n\nNội dung đã được tối ưu hóa và viết lại để phù hợp với yêu cầu.`,
        style: rewriteStyle,
        audience: targetAudience,
        tone: tone,
        createdAt: new Date().toISOString()
      };
      setRewrittenContent(newRewrite.rewritten);
      setRewriteHistory(prev => [newRewrite, ...prev]);
      setIsRewriting(false);
    }, 2000);
  };

  const styleOptions = [
    { value: 'improve', label: 'Cải thiện chung' },
    { value: 'seo', label: 'Tối ưu SEO' },
    { value: 'shorter', label: 'Rút gọn' },
    { value: 'longer', label: 'Mở rộng' },
    { value: 'simplify', label: 'Đơn giản hóa' },
    { value: 'academic', label: 'Học thuật' }
  ];

  const audienceOptions = [
    { value: 'general', label: 'Đại chúng' },
    { value: 'professional', label: 'Chuyên nghiệp' },
    { value: 'students', label: 'Sinh viên' },
    { value: 'children', label: 'Trẻ em' },
    { value: 'elderly', label: 'Người cao tuổi' },
    { value: 'experts', label: 'Chuyên gia' }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Chuyên nghiệp' },
    { value: 'friendly', label: 'Thân thiện' },
    { value: 'formal', label: 'Trang trọng' },
    { value: 'casual', label: 'Thường ngày' },
    { value: 'persuasive', label: 'Thuyết phục' },
    { value: 'informative', label: 'Thông tin' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Viết lại bài viết</h2>
        <p className="text-muted-foreground">Sử dụng AI để viết lại và cải thiện nội dung của bạn</p>
      </div>

      <Tabs defaultValue="rewrite" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rewrite">Viết lại</TabsTrigger>
          <TabsTrigger value="history">Lịch sử ({rewriteHistory.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="rewrite" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Nội dung gốc
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="original">Nhập nội dung cần viết lại *</Label>
                  <Textarea
                    id="original"
                    placeholder="Dán nội dung bài viết của bạn vào đây..."
                    value={originalContent}
                    onChange={(e) => setOriginalContent(e.target.value)}
                    rows={8}
                    className="min-h-[200px]"
                  />
                  <div className="text-sm text-muted-foreground">
                    Số từ: {originalContent.trim().split(/\s+/).filter(word => word).length}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="style">Phong cách viết lại</Label>
                    <Select value={rewriteStyle} onValueChange={setRewriteStyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {styleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audience">Đối tượng đọc</Label>
                    <Select value={targetAudience} onValueChange={setTargetAudience}>
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
                </div>

                <Button 
                  onClick={handleRewrite} 
                  disabled={!originalContent.trim() || isRewriting}
                  className="w-full"
                >
                  {isRewriting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang viết lại...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Viết lại nội dung
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Nội dung đã viết lại
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {rewrittenContent ? (
                  <>
                    <Textarea
                      value={rewrittenContent}
                      onChange={(e) => setRewrittenContent(e.target.value)}
                      rows={12}
                      className="min-h-[300px]"
                    />
                    <div className="text-sm text-muted-foreground">
                      Số từ: {rewrittenContent.trim().split(/\s+/).filter(word => word).length}
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
                  </>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <RefreshCw className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Nội dung viết lại sẽ xuất hiện ở đây</p>
                      <p className="text-sm">Nhập nội dung gốc và nhấn "Viết lại"</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {rewriteHistory.length === 0 ? (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <RefreshCw className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Chưa có lịch sử viết lại</p>
                <p className="text-sm">Các lần viết lại trước đó sẽ được lưu ở đây</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {rewriteHistory.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{item.style}</Badge>
                        <Badge variant="outline">{item.audience}</Badge>
                        <Badge variant="outline">{item.tone}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(item.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Nội dung gốc:</h4>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {item.original}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Đã viết lại:</h4>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {item.rewritten}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-2" />
                        Sao chép
                      </Button>
                      <Button variant="outline" size="sm">
                        Sử dụng lại
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
