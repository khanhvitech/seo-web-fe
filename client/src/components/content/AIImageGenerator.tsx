import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Wand2, 
  Download, 
  Copy, 
  Heart, 
  Trash2,
  Image as ImageIcon,
  Loader2
} from "lucide-react";

export function AIImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [size, setSize] = useState('1024x1024');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<any[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      const newImage = {
        id: Date.now(),
        prompt,
        style,
        size,
        url: `https://picsum.photos/512/512?random=${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      setGeneratedImages(prev => [newImage, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  const styleOptions = [
    { value: 'realistic', label: 'Thực tế' },
    { value: 'artistic', label: 'Nghệ thuật' },
    { value: 'cartoon', label: 'Hoạt hình' },
    { value: 'abstract', label: 'Trừu tượng' },
    { value: 'vintage', label: 'Cổ điển' },
    { value: 'modern', label: 'Hiện đại' }
  ];

  const sizeOptions = [
    { value: '512x512', label: '512x512 (Vuông)' },
    { value: '1024x1024', label: '1024x1024 (Vuông HD)' },
    { value: '1024x768', label: '1024x768 (Ngang)' },
    { value: '768x1024', label: '768x1024 (Dọc)' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Tạo ảnh AI</h2>
        <p className="text-muted-foreground">Tạo ảnh chất lượng cao từ mô tả văn bản bằng AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generator Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5" />
              Tạo ảnh mới
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Mô tả ảnh *</Label>
              <Textarea
                id="prompt"
                placeholder="Ví dụ: Một con mèo dễ thương đang ngồi trên bàn làm việc, phong cách anime, màu sắc tươi sáng..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Phong cách</Label>
              <Select value={style} onValueChange={setStyle}>
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
              <Label htmlFor="size">Kích thước</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sizeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!prompt.trim() || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang tạo...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Tạo ảnh
                </>
              )}
            </Button>

            {isGenerating && (
              <div className="text-sm text-muted-foreground text-center">
                Thời gian ước tính: 2-3 giây
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Images */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Ảnh đã tạo ({generatedImages.length})</h3>
            {generatedImages.length > 0 && (
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Tải tất cả
              </Button>
            )}
          </div>

          {generatedImages.length === 0 ? (
            <Card className="h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Chưa có ảnh nào được tạo</p>
                <p className="text-sm">Nhập mô tả và nhấn "Tạo ảnh" để bắt đầu</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {generatedImages.map((image) => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="aspect-square relative group">
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <p className="text-sm line-clamp-2">{image.prompt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <Badge variant="outline">{image.style}</Badge>
                        <span>{image.size}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
