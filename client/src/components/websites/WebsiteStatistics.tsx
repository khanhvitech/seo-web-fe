import { Website } from "@/types/website";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Activity,
  Calendar
} from "lucide-react";

interface WebsiteStatisticsProps {
  website: Website;
  onClose: () => void;
}

// Mock data for monthly trend
const monthlyData = [
  { month: 'T6', posts: 45 },
  { month: 'T7', posts: 52 },
  { month: 'T8', posts: 38 },
  { month: 'T9', posts: 61 },
  { month: 'T10', posts: 29 },
  { month: 'T11', posts: 43 },
];

export function WebsiteStatistics({ website, onClose }: WebsiteStatisticsProps) {
  const successRate = ((website.total_posts - website.failed_posts) / website.total_posts * 100).toFixed(1);
  const avgResponseTime = website.response_time;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
            <span className="text-lg">📊</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{website.name} - Statistics</h2>
            <p className="text-muted-foreground">{website.url}</p>
          </div>
        </div>
        <Button variant="outline" onClick={onClose}>
          ✕ Đóng
        </Button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Posts */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Posts Published</p>
                <p className="text-2xl font-bold">{website.total_posts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{successRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Failed Posts */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Failed Posts</p>
                <p className="text-2xl font-bold text-red-600">{website.failed_posts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Uptime */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Uptime (30 days)</p>
                <p className="text-2xl font-bold text-purple-600">{website.uptime}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time & Uptime */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Average Response Time</span>
                <span className={`font-bold ${
                  avgResponseTime < 500 ? 'text-green-600' :
                  avgResponseTime < 1000 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {avgResponseTime}ms
                </span>
              </div>
              <Progress 
                value={Math.min((1000 - avgResponseTime) / 10, 100)} 
                className="h-2" 
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Uptime</span>
                <span className="font-bold text-green-600">{website.uptime}%</span>
              </div>
              <Progress value={website.uptime} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Health Score</span>
                <span className={`font-bold ${
                  website.health_score >= 80 ? 'text-green-600' :
                  website.health_score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {website.health_score}/100
                </span>
              </div>
              <Progress value={website.health_score} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-green-600">✅</span>
                <div>
                  <p className="font-medium">Last Successful Post</p>
                  <p className="text-sm text-muted-foreground">
                    {website.last_successful_post || 'Chưa có bài viết'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-blue-600">🔍</span>
                <div>
                  <p className="font-medium">Last Health Check</p>
                  <p className="text-sm text-muted-foreground">{website.last_check}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-gray-600">📅</span>
                <div>
                  <p className="font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">{website.created_at}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-purple-600">🔧</span>
                <div>
                  <p className="font-medium">Platform</p>
                  <p className="text-sm text-muted-foreground">
                    {website.platform} {website.platform_version}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Publishing Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            📈 Monthly Publishing Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="posts" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">268</p>
              <p className="text-sm text-muted-foreground">Posts this month</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">+12%</p>
              <p className="text-sm text-muted-foreground">vs last month</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">8.9</p>
              <p className="text-sm text-muted-foreground">Posts per day</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Report Button */}
      <div className="flex justify-center">
        <Button size="lg" className="px-8">
          <FileText className="w-4 h-4 mr-2" />
          📊 View Full Report
        </Button>
      </div>
    </div>
  );
}
