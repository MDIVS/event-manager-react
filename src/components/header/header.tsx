import { EventName } from './event-name';
import { CalendarHeart } from "lucide-react";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <CalendarHeart color="rgb(234 179 8)"/> {/* rgb(234 179 8) = text-yellow-500 */}
      <EventName> EVENT NAME </EventName>
    </div>
  );
}
