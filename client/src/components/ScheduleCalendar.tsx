import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  website: string;
  date: number;
}

interface ScheduleCalendarProps {
  events: ScheduleEvent[];
}

export function ScheduleCalendar({ events }: ScheduleCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState('Tháng 3, 2024');
  
  const daysInMonth = 31;
  const startDay = 4;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDay }, (_, i) => i);

  const getEventsForDay = (day: number) => {
    return events.filter(e => e.date === day);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="text-lg font-semibold">Lịch đăng bài</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" data-testid="button-prev-month">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium px-2">{currentMonth}</span>
          <Button variant="ghost" size="icon" data-testid="button-next-month">
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button size="sm" className="ml-2" data-testid="button-add-schedule">
            <Plus className="w-4 h-4 mr-1" />
            Thêm lịch
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
          {emptyDays.map((i) => (
            <div key={`empty-${i}`} className="p-2"></div>
          ))}
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isToday = day === 15;
            
            return (
              <div
                key={day}
                className={`min-h-24 p-2 border rounded-lg hover-elevate ${isToday ? 'border-primary' : 'border-border'}`}
                data-testid={`calendar-day-${day}`}
              >
                <div className={`text-sm font-medium mb-2 ${isToday ? 'text-primary' : 'text-foreground'}`}>
                  {day}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 rounded bg-primary/10 text-primary truncate"
                      data-testid={`event-${event.id}`}
                    >
                      {event.time} {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} khác</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
