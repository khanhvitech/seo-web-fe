import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Upload, 
  Search, 
  Grid3X3, 
  List, 
  Image as ImageIcon,
  Eye,
  Trash2,
  Copy
} from "lucide-react";

interface ImageItem {
  id: string;
  filename: string;
  url: string;
  alt: string;
  title: string;
  size: string;
  dimensions: string;
  uploadedAt: string;
  usedIn: number;
}

const mockImages: ImageItem[] = [
  {
    id: '1',
    filename: 'seo-guide-cover.jpg',
    url: 'https://via.placeholder.com/300x200',
    alt: 'SEO Guide Cover',
    title: 'SEO Guide Cover Image',
    size: '256 KB',
    dimensions: '1200x800',
    uploadedAt: '15/03/2024',
    usedIn: 3
  },
  {
    id: '2',
    filename: 'marketing-tools.png',
    url: 'https://via.placeholder.com/300x200',
    alt: 'Marketing Tools',
    title: 'Marketing Tools Infographic',
    size: '512 KB',
    dimensions: '1600x900',
    uploadedAt: '14/03/2024',
    usedIn: 1
  },
  {
    id: '3',
    filename: 'content-strategy.jpg',
    url: 'https://via.placeholder.com/300x200',
    alt: 'Content Strategy',
    title: 'Content Strategy Diagram',
    size: '128 KB',
    dimensions: '800x600',
    uploadedAt: '13/03/2024',
    usedIn: 0
  }
];

export function ImagesLibrary() {
  const [images] = useState<ImageItem[]>(mockImages);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const filteredImages = images.filter(image =>
    image.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Thư viện ảnh</h2>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload ảnh mới
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm ảnh..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-1 border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onClick={() => setSelectedImage(image)}
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button variant="secondary" size="sm" className="w-8 h-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="sm" className="w-8 h-8 p-0">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate">{image.filename}</h3>
                <div className="text-sm text-muted-foreground mt-1">
                  <div>{image.dimensions}</div>
                  <div>{image.size}</div>
                  <div className="flex justify-between mt-2">
                    <span>{image.uploadedAt}</span>
                    <span>{image.usedIn > 0 ? `${image.usedIn} bài` : 'Chưa dùng'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredImages.map((image) => (
                <div key={image.id} className="p-4 flex items-center gap-4 hover:bg-muted/50">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{image.filename}</h3>
                    <div className="text-sm text-muted-foreground">
                      {image.dimensions} • {image.size} • {image.uploadedAt}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {image.usedIn > 0 ? `Sử dụng trong ${image.usedIn} bài` : 'Chưa được sử dụng'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Chi tiết ảnh</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedImage(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-full rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Tên file:</label>
                  <p className="text-sm text-muted-foreground">{selectedImage.filename}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Kích thước:</label>
                  <p className="text-sm text-muted-foreground">{selectedImage.size}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Dimensions:</label>
                  <p className="text-sm text-muted-foreground">{selectedImage.dimensions}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Ngày upload:</label>
                  <p className="text-sm text-muted-foreground">{selectedImage.uploadedAt}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Alt Text:</label>
                <Input value={selectedImage.alt} className="mt-1" />
              </div>
              
              <div>
                <label className="text-sm font-medium">Title:</label>
                <Input value={selectedImage.title} className="mt-1" />
              </div>
              
              <div>
                <label className="text-sm font-medium">URL:</label>
                <div className="flex gap-2">
                  <Input value={selectedImage.url} readOnly className="mt-1" />
                  <Button variant="outline" size="sm" className="mt-1">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button>Lưu thay đổi</Button>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Xóa ảnh
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
