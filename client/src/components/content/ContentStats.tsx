import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileEdit, CheckCircle, Clock } from "lucide-react";

const statsData = [
  {
    title: "Tổng số bài viết",
    value: "156",
    icon: FileText,
    description: "+12 bài trong tháng này",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Bài nháp",
    value: "24",
    icon: FileEdit,
    description: "Cần hoàn thiện",
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  },
  {
    title: "Đã xuất bản",
    value: "98",
    icon: CheckCircle,
    description: "+8 bài tuần này",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Đã lên lịch",
    value: "16",
    icon: Clock,
    description: "Trong 7 ngày tới",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }
];

export function ContentStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
