import { ScheduleCalendar } from '../ScheduleCalendar';

const mockEvents = [
  { id: '1', title: 'SEO Guide', time: '10:00', website: 'Blog', date: 15 },
  { id: '2', title: 'Marketing Tips', time: '14:00', website: 'Medium', date: 15 },
  { id: '3', title: 'Content Strategy', time: '16:00', website: 'News', date: 15 },
  { id: '4', title: 'WordPress Tutorial', time: '09:00', website: 'Blog', date: 18 },
  { id: '5', title: 'Email Marketing', time: '11:00', website: 'Medium', date: 20 },
  { id: '6', title: 'Social Media', time: '15:00', website: 'Blog', date: 22 },
  { id: '7', title: 'Analytics Guide', time: '10:00', website: 'News', date: 25 },
];

export default function ScheduleCalendarExample() {
  return (
    <div className="p-6">
      <ScheduleCalendar events={mockEvents} />
    </div>
  );
}
