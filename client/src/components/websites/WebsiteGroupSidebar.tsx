import { SiteGroup } from "@/types/website";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FolderOpen } from "lucide-react";

interface WebsiteGroupSidebarProps {
  groups: SiteGroup[];
  activeGroup: string;
  onGroupChange: (groupId: string) => void;
  onCreateGroup: () => void;
  totalWebsites: number;
}

export function WebsiteGroupSidebar({
  groups,
  activeGroup,
  onGroupChange,
  onCreateGroup,
  totalWebsites,
}: WebsiteGroupSidebarProps) {
  return (
    <Card className="w-64 h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          Nhóm Websites
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* All websites */}
        <Button
          variant={activeGroup === 'all' ? 'secondary' : 'ghost'}
          className="w-full justify-start h-auto p-3"
          onClick={() => onGroupChange('all')}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span>📁</span>
              <span>Tất cả websites</span>
            </div>
            <Badge variant="outline">{totalWebsites}</Badge>
          </div>
        </Button>

        {/* Group list */}
        {groups.map((group) => (
          <Button
            key={group.id}
            variant={activeGroup === group.id ? 'secondary' : 'ghost'}
            className="w-full justify-start h-auto p-3"
            onClick={() => onGroupChange(group.id)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: group.color }}
                />
                <span className="truncate">{group.name}</span>
              </div>
              <Badge variant="outline">{group.website_count}</Badge>
            </div>
          </Button>
        ))}

        {/* Create new group */}
        <Button
          variant="outline"
          className="w-full justify-start h-auto p-3 border-dashed"
          onClick={onCreateGroup}
        >
          <Plus className="w-4 h-4 mr-2" />
          Tạo nhóm mới
        </Button>
      </CardContent>
    </Card>
  );
}
