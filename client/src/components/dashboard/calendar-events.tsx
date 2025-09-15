import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const upcomingEvents = [
  {
    id: 1,
    title: "Client Meeting - XYZ Corp",
    day: 15,
    month: "Nov",
    time: "2:00 PM - 3:00 PM",
    location: "Conference Room A",
    borderColor: "border-l-primary",
    attendees: 4
  },
  {
    id: 2,
    title: "Team Standup",
    day: 16,
    month: "Nov",
    time: "9:00 AM - 9:30 AM",
    location: "Virtual Meeting",
    borderColor: "border-l-green-500",
    attendees: 8
  },
  {
    id: 3,
    title: "Product Demo - New Features",
    day: 18,
    month: "Nov",
    time: "11:00 AM - 12:00 PM",
    location: "Main Auditorium",
    borderColor: "border-l-orange-500",
    attendees: 25
  },
  {
    id: 4,
    title: "Quarterly Review",
    day: 20,
    month: "Nov",
    time: "3:00 PM - 5:00 PM",
    location: "Board Room",
    borderColor: "border-l-blue-500",
    attendees: 12
  }
];

interface CalendarEventsProps {
  "data-testid"?: string;
}

export default function CalendarEvents({ "data-testid": testId }: CalendarEventsProps) {
  const [currentMonth, setCurrentMonth] = useState("November 2024");

  const navigateMonth = (direction: "prev" | "next") => {
    // Simple month navigation for demo
    const months = ["November 2024", "December 2024", "January 2025"];
    const currentIndex = months.indexOf(currentMonth);
    
    if (direction === "prev" && currentIndex > 0) {
      setCurrentMonth(months[currentIndex - 1]);
    } else if (direction === "next" && currentIndex < months.length - 1) {
      setCurrentMonth(months[currentIndex + 1]);
    }
  };

  return (
    <Card data-testid={testId}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateMonth("prev")}
              data-testid="button-prev-month"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm px-3 py-1" data-testid="current-month">
              {currentMonth}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateMonth("next")}
              data-testid="button-next-month"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className={`flex items-center space-x-3 p-3 border-l-4 ${event.borderColor} bg-muted rounded-r-lg hover:bg-muted/70 cursor-pointer`}
              data-testid={`event-item-${event.id}`}
            >
              <div className="text-center flex-shrink-0">
                <p className="text-lg font-bold text-primary" data-testid={`event-day-${event.id}`}>
                  {event.day}
                </p>
                <p className="text-xs text-muted-foreground" data-testid={`event-month-${event.id}`}>
                  {event.month}
                </p>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm" data-testid={`event-title-${event.id}`}>
                  {event.title}
                </p>
                <p className="text-xs text-muted-foreground" data-testid={`event-time-${event.id}`}>
                  {event.time}
                </p>
                <p className="text-xs text-muted-foreground" data-testid={`event-location-${event.id}`}>
                  {event.location}
                </p>
              </div>
              <Badge variant="outline" data-testid={`event-attendees-${event.id}`}>
                {event.attendees} people
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
