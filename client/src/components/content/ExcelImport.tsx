import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Download,
  Eye
} from 'lucide-react';

interface ExcelImportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (contents: any[]) => void;
}

interface ImportedContent {
  title: string;
  content: string;
  category: string;
  tags: string;
  language: string;
  status: 'valid' | 'invalid';
  errors: string[];
}

export function ExcelImport({ open, onOpenChange, onImport }: ExcelImportProps) {
  const [step, setStep] = useState<'upload' | 'preview' | 'importing' | 'complete'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [importedData, setImportedData] = useState<ImportedContent[]>([]);
  const [progress, setProgress] = useState(0);
  const [validCount, setValidCount] = useState(0);
  const [invalidCount, setInvalidCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock function to parse Excel file (in real app, would use xlsx library)
  const parseExcelFile = (file: File): Promise<ImportedContent[]> => {
    return new Promise((resolve) => {
      // Simulate file parsing delay
      setTimeout(() => {
        const mockData: ImportedContent[] = [
          {
            title: 'Hướng dẫn SEO hiệu quả',
            content: 'Nội dung chi tiết về SEO...',
            category: 'SEO',
            tags: 'seo, marketing, digital',
            language: 'vi',
            status: 'valid',
            errors: []
          },
          {
            title: 'Marketing Online 2024',
            content: 'Xu hướng marketing online năm 2024...',
            category: 'Marketing',
            tags: 'marketing, online, trends',
            language: 'vi',
            status: 'valid',
            errors: []
          },
          {
            title: '', // Invalid - no title
            content: 'Nội dung không có tiêu đề...',
            category: 'Other',
            tags: 'test',
            language: 'vi',
            status: 'invalid',
            errors: ['Tiêu đề không được để trống']
          },
          {
            title: 'Content Writing Tips',
            content: 'How to write effective content...',
            category: 'Writing',
            tags: 'writing, content, tips',
            language: 'en',
            status: 'valid',
            errors: []
          }
        ];
        resolve(mockData);
      }, 1500);
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.includes('sheet') || selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls')) {
        setFile(selectedFile);
      } else {
        alert('Vui lòng chọn file Excel (.xlsx hoặc .xls)');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setStep('preview');
    setProgress(30);
    
    try {
      const data = await parseExcelFile(file);
      setImportedData(data);
      
      const valid = data.filter(item => item.status === 'valid').length;
      const invalid = data.filter(item => item.status === 'invalid').length;
      
      setValidCount(valid);
      setInvalidCount(invalid);
      setProgress(100);
    } catch (error) {
      console.error('Error parsing file:', error);
      alert('Lỗi khi đọc file Excel');
      setStep('upload');
    }
  };

  const handleImport = async () => {
    setStep('importing');
    setProgress(0);
    
    const validData = importedData.filter(item => item.status === 'valid');
    
    // Simulate import process
    for (let i = 0; i <= validData.length; i++) {
      setProgress((i / validData.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Convert to format expected by parent component
    const formattedData = validData.map((item, index) => ({
      id: `import_${Date.now()}_${index}`,
      title: item.title,
      content: item.content,
      status: 'draft',
      content_type: 'article',
      source_type: 'file',
      categories: [item.category],
      tags: item.tags.split(',').map(tag => tag.trim()),
      language: item.language,
      word_count: item.content.length,
      seo_score: Math.floor(Math.random() * 100),
      created_at: new Date().toISOString().split('T')[0]
    }));
    
    setStep('complete');
    onImport(formattedData);
  };

  const downloadTemplate = () => {
    // In real app, would generate and download Excel template
    const templateData = `Title,Content,Category,Tags,Language
"Tiêu đề bài viết","Nội dung chi tiết...","SEO","seo, marketing","vi"
"Article Title","Detailed content...","Marketing","marketing, tips","en"`;
    
    const blob = new Blob([templateData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetImport = () => {
    setStep('upload');
    setFile(null);
    setImportedData([]);
    setProgress(0);
    setValidCount(0);
    setInvalidCount(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetImport();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />
            Import nội dung từ Excel
          </DialogTitle>
        </DialogHeader>

        {step === 'upload' && (
          <div className="space-y-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                File Excel cần có các cột: <strong>Title, Content, Category, Tags, Language</strong>
              </AlertDescription>
            </Alert>

            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={downloadTemplate} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Tải template mẫu
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label htmlFor="excel-file">Chọn file Excel (.xlsx, .xls)</Label>
              <Input
                id="excel-file"
                type="file"
                ref={fileInputRef}
                accept=".xlsx,.xls,.csv"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
              
              {file && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{file.name}</span>
                  <Badge variant="secondary">{(file.size / 1024).toFixed(1)} KB</Badge>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                Hủy
              </Button>
              <Button onClick={handleUpload} disabled={!file} className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Tải lên và xem trước
              </Button>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="default" className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {validCount} hợp lệ
                </Badge>
                {invalidCount > 0 && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {invalidCount} lỗi
                  </Badge>
                )}
              </div>
              <Progress value={progress} className="w-32" />
            </div>

            <div className="max-h-96 overflow-y-auto border rounded-lg">
              <div className="space-y-2 p-4">
                {importedData.map((item, index) => (
                  <div key={index} className={`p-3 border rounded-lg ${item.status === 'valid' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title || '<Không có tiêu đề>'}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.content.substring(0, 100)}...
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          <Badge variant="outline" className="text-xs">{item.language}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.status === 'valid' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                    
                    {item.errors.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {item.errors.map((error, errorIndex) => (
                          <p key={errorIndex} className="text-xs text-red-600">• {error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={resetImport}>
                Chọn file khác
              </Button>
              <Button 
                onClick={handleImport} 
                disabled={validCount === 0}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Import {validCount} nội dung
              </Button>
            </div>
          </div>
        )}

        {step === 'importing' && (
          <div className="space-y-6 text-center">
            <div className="space-y-4">
              <FileSpreadsheet className="w-12 h-12 mx-auto text-primary" />
              <h3 className="text-lg font-medium">Đang import nội dung...</h3>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Vui lòng đợi trong giây lát
              </p>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="space-y-6 text-center">
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 mx-auto text-green-600" />
              <h3 className="text-lg font-medium text-green-600">Import thành công!</h3>
              <p className="text-muted-foreground">
                Đã import thành công {validCount} nội dung vào hệ thống
              </p>
            </div>

            <div className="flex justify-center gap-2">
              <Button onClick={handleClose}>
                Đóng
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
