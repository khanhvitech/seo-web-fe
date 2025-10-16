import { useState } from "react";
import { ContentSidebar } from "../components/content/ContentSidebar";
import { ContentTable } from "../components/content/ContentTable";
import { ContentForm } from "../components/content/ContentForm";
import { CategoriesManagement } from "../components/content/CategoriesManagement";
import { ImagesLibrary } from "../components/content/ImagesLibrary";
import { AutoSources } from "../components/content/AutoSources";
import { AIImageGenerator } from "../components/content/AIImageGenerator";
import { ContentRewriter } from "../components/content/ContentRewriter";
import { AIContentGenerator } from "../components/content/AIContentGenerator";
import { ExcelImport } from "../components/content/ExcelImport";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, FolderOpen, FileSpreadsheet } from "lucide-react";

// Mock data for testing
const mockContents = [
  {
    id: '1',
    title: 'Hướng dẫn SEO cho người mới bắt đầu',
    status: 'published' as const,
    content_type: 'article' as const,
    source_type: 'manual' as const,
    categories: ['SEO', 'Marketing'],
    language: 'vi',
    word_count: 1500,
    seo_score: 85,
    created_at: '2024-01-15',
    published_at: '2024-01-16'
  },
  {
    id: '2',
    title: '10 mẹo viết content marketing hiệu quả',
    status: 'ready' as const,
    content_type: 'article' as const,
    source_type: 'ai' as const,
    categories: ['Content Marketing', 'Writing'],
    language: 'vi',
    word_count: 2200,
    seo_score: 72,
    created_at: '2024-01-14'
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy 2024',
    status: 'draft' as const,
    content_type: 'video' as const,
    source_type: 'file' as const,
    categories: ['Digital Marketing', 'Strategy'],
    language: 'en',
    word_count: 1800,
    seo_score: 90,
    created_at: '2024-01-13'
  },
  {
    id: '4',
    title: 'Xu hướng công nghệ 2024',
    status: 'archived' as const,
    content_type: 'infographic' as const,
    source_type: 'rss' as const,
    categories: ['Technology', 'Trends'],
    language: 'vi',
    word_count: 800,
    seo_score: 65,
    created_at: '2024-01-12',
    published_at: '2024-01-12'
  },
  {
    id: '5',
    title: 'E-commerce Best Practices',
    status: 'published' as const,
    content_type: 'article' as const,
    source_type: 'url' as const,
    categories: ['E-commerce', 'Business'],
    language: 'en',
    word_count: 3200,
    seo_score: 88,
    created_at: '2024-01-11',
    published_at: '2024-01-11'
  }
];

export default function Content() {
  const [activeView, setActiveView] = useState('all-content');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [contents, setContents] = useState(mockContents);

  const handleEdit = (content: any) => {
    setEditingContent(content);
    setShowCreateForm(true);
  };

  const handleExcelImport = (importedContents: any[]) => {
    setContents(prev => [...prev, ...importedContents]);
    setShowExcelImport(false);
  };

  const renderMainContent = () => {
    if (showCreateForm) {
      return <ContentForm onClose={() => setShowCreateForm(false)} />;
    }

    switch (activeView) {
      case 'all-content':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Tất cả nội dung</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setShowCategoriesModal(true)}>
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Quản lý danh mục
                </Button>
                <Button variant="outline" onClick={() => setShowExcelImport(true)}>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Import từ Excel
                </Button>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo nội dung mới
                </Button>
              </div>
            </div>
            <ContentTable 
              contents={contents} 
              onEdit={handleEdit}
            />
          </div>
        );
      case 'create':
        return (
          <ContentForm 
            onClose={() => {
              setActiveView('all-content');
              setEditingContent(null);
            }} 
            editingContent={editingContent}
          />
        );
      case 'ai-images':
        return <AIImageGenerator />;
      case 'rewrite-content':
        return <ContentRewriter />;
      case 'ai-content':
        return <AIContentGenerator />;
      case 'images':
        return <ImagesLibrary />;
      case 'auto-sources':
        return <AutoSources />;
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Tất cả nội dung</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setShowCategoriesModal(true)}>
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Quản lý danh mục
                </Button>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo nội dung mới
                </Button>
              </div>
            </div>
            <ContentTable 
              contents={mockContents} 
              onEdit={handleEdit}
            />
          </div>
        );
    }
  };

  return (
    <div className="flex h-full">
      <ContentSidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />
      <div className="flex-1 p-6">
        {renderMainContent()}
      </div>

      {/* Categories Management Modal */}
      <Dialog open={showCategoriesModal} onOpenChange={setShowCategoriesModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quản lý danh mục</DialogTitle>
          </DialogHeader>
          <CategoriesManagement />
        </DialogContent>
      </Dialog>

      {/* Excel Import Modal */}
      <ExcelImport 
        open={showExcelImport} 
        onOpenChange={setShowExcelImport}
        onImport={handleExcelImport}
      />
    </div>
  );
}
