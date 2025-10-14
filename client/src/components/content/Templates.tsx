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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  FileCode, 
  Plus, 
  Edit, 
  Trash2, 
  Copy,
  Eye,
  Users,
  Lock
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  type: 'article' | 'social' | 'email';
  category: 'system' | 'custom';
  isPublic: boolean;
  usageCount: number;
  createdAt: string;
  variables: string[];
  content: string;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Blog Post Standard',
    description: 'Template chuẩn cho blog post với cấu trúc SEO tối ưu',
    type: 'article',
    category: 'system',
    isPublic: true,
    usageCount: 45,
    createdAt: '15/03/2024',
    variables: ['title', 'content', 'author', 'tags'],
    content: '# {{title}}\n\nBy {{author}}\n\n{{content}}\n\nTags: {{tags}}'
  },
  {
    id: '2',
    name: 'Product Review',
    description: 'Template đánh giá sản phẩm với rating và pros/cons',
    type: 'article',
    category: 'custom',
    isPublic: false,
    usageCount: 12,
    createdAt: '14/03/2024',
    variables: ['product_name', 'rating', 'pros', 'cons', 'conclusion'],
    content: '# Đánh giá {{product_name}}\n\nRating: {{rating}}/5\n\n## Ưu điểm\n{{pros}}\n\n## Nhược điểm\n{{cons}}\n\n## Kết luận\n{{conclusion}}'
  },
  {
    id: '3',
    name: 'Social Media Post',
    description: 'Template cho bài đăng mạng xã hội',
    type: 'social',
    category: 'system',
    isPublic: true,
    usageCount: 78,
    createdAt: '13/03/2024',
    variables: ['message', 'hashtags', 'call_to_action'],
    content: '{{message}}\n\n{{hashtags}}\n\n{{call_to_action}}'
  }
];

export function Templates() {
  const [templates] = useState<Template[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || template.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const typeLabels = {
    article: 'Article',
    social: 'Social Media',
    email: 'Email'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Templates nội dung</h2>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tạo template mới
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Tìm kiếm templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Loại template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại</SelectItem>
            <SelectItem value="article">Article</SelectItem>
            <SelectItem value="social">Social Media</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Templates Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template name</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Công khai</TableHead>
                <TableHead>Số lần dùng</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="w-32">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <FileCode className="w-4 h-4" />
                        {template.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {typeLabels[template.type]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={template.category === 'system' ? 'default' : 'secondary'}>
                      {template.category === 'system' ? 'System' : 'Custom'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {template.isPublic ? (
                        <Users className="w-4 h-4 text-green-600" />
                      ) : (
                        <Lock className="w-4 h-4 text-orange-600" />
                      )}
                      <span className="text-sm">
                        {template.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{template.usageCount}</Badge>
                  </TableCell>
                  <TableCell>{template.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(template)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tạo template mới</CardTitle>
                <Button variant="ghost" onClick={() => setShowCreateForm(false)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="templateName">Tên template</Label>
                <Input id="templateName" placeholder="Nhập tên template..." />
              </div>

              <div>
                <Label htmlFor="templateDescription">Mô tả</Label>
                <Textarea id="templateDescription" placeholder="Mô tả template..." rows={2} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Loại template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Danh mục</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="templateContent">Nội dung template</Label>
                <Textarea 
                  id="templateContent" 
                  placeholder="Nhập nội dung template với biến {{variable_name}}..." 
                  rows={10}
                  className="font-mono text-sm"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Sử dụng {`{{variable_name}}`} để tạo biến động
                </div>
              </div>

              <div>
                <Label htmlFor="templateVariables">Danh sách biến (phân cách bằng dấu phẩy)</Label>
                <Input 
                  id="templateVariables" 
                  placeholder="title, content, author, tags..." 
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="isPublic" />
                <Label htmlFor="isPublic">Template công khai</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button>Tạo template</Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Hủy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedTemplate.name}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedTemplate(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-muted-foreground">{selectedTemplate.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Loại:</Label>
                  <p>{typeLabels[selectedTemplate.type]}</p>
                </div>
                <div>
                  <Label>Danh mục:</Label>
                  <p>{selectedTemplate.category === 'system' ? 'System' : 'Custom'}</p>
                </div>
                <div>
                  <Label>Số lần sử dụng:</Label>
                  <p>{selectedTemplate.usageCount}</p>
                </div>
                <div>
                  <Label>Ngày tạo:</Label>
                  <p>{selectedTemplate.createdAt}</p>
                </div>
              </div>

              <div>
                <Label>Biến có sẵn:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTemplate.variables.map((variable, index) => (
                    <Badge key={index} variant="outline">
                      {`{{${variable}}}`}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Nội dung template:</Label>
                <div className="mt-2 p-4 bg-muted rounded-lg font-mono text-sm whitespace-pre-wrap">
                  {selectedTemplate.content}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button>Sử dụng template</Button>
                <Button variant="outline">Nhân bản</Button>
                <Button variant="outline">Chỉnh sửa</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
