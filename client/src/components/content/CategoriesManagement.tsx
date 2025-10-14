import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Plus, 
  Edit, 
  Trash2, 
  Check,
  X
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  active: boolean;
  postCount: number;
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'SEO',
    active: true,
    postCount: 24
  },
  {
    id: '2',
    name: 'Marketing',
    active: true,
    postCount: 18
  },
  {
    id: '3',
    name: 'Content Marketing',
    active: true,
    postCount: 15
  }
];

export function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');
  const [formData, setFormData] = useState({
    name: ''
  });

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name
    }));
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const handleSaveEdit = (categoryId: string) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, name: editingName }
          : cat
      )
    );
    setEditingId(null);
    setEditingName('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleDelete = (category: Category) => {
    if (category.postCount > 0) {
      const confirmed = window.confirm(
        `Danh mục "${category.name}" có ${category.postCount} bài viết. Bạn có chắc chắn muốn xóa?`
      );
      if (!confirmed) return;
    }
    
    setCategories(prev => prev.filter(cat => cat.id !== category.id));
  };

  const renderCategoryRow = (category: Category, orderNumber: number): React.ReactNode => {
    const isEditing = editingId === category.id;
    
    return (
      <TableRow key={category.id}>
        <TableCell>
          <span className="text-sm text-muted-foreground">{orderNumber}</span>
        </TableCell>
        <TableCell>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                className="h-8"
                autoFocus
              />
              <Button size="sm" onClick={() => handleSaveEdit(category.id)}>
                <Check className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <span className="font-medium">{category.name}</span>
          )}
        </TableCell>
        <TableCell>
          <Badge variant="secondary">{category.postCount}</Badge>
        </TableCell>
        <TableCell>
          <Badge variant={category.active ? "default" : "secondary"}>
            {category.active ? "Hoạt động" : "Không hoạt động"}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive"
                  onClick={() => handleDelete(category)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý danh mục</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form tạo mới */}
        <Card>
          <CardHeader>
            <CardTitle>Thêm danh mục mới</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="categoryName">Tên danh mục</Label>
              <Input
                id="categoryName"
                placeholder="Nhập tên danh mục..."
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>

            <Button className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Thêm danh mục
            </Button>
          </CardContent>
        </Card>

        {/* Danh sách danh mục */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">STT</TableHead>
                    <TableHead>Tên danh mục</TableHead>
                    <TableHead>Số bài</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="w-20">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category, index) => renderCategoryRow(category, index + 1))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
