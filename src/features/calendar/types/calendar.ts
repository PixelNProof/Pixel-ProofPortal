export type EventType = "Meeting" | "Content Posting" | "Deadline" | "Internal";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  type: EventType;
  client?: string;
  participants?: string[];
}
