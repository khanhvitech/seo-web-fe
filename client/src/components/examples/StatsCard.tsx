import { StatsCard } from '../StatsCard';
import { FileText, Globe, Calendar, CheckCircle } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      <StatsCard title="Tổng nội dung" value="248" icon={FileText} change="+12% so với tháng trước" changeType="increase" />
      <StatsCard title="Website kết nối" value="8" icon={Globe} change="+2 mới" changeType="increase" />
      <StatsCard title="Đã lên lịch" value="64" icon={Calendar} change="-5% so với tuần trước" changeType="decrease" />
      <StatsCard title="Đã đăng" value="1,429" icon={CheckCircle} change="+8% so với tháng trước" changeType="increase" />
    </div>
  );
}
