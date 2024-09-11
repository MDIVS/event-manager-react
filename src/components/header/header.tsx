import { EventName } from './event-name';
import { CalendarHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const routeChange = () =>{
    navigate('/');
  }

  return (
    <button onClick={routeChange} className="flex items-center gap-3 py-2">
      <CalendarHeart color="rgb(234 179 8)"/> {/* rgb(234 179 8) = text-yellow-500 */}
      <EventName> EVENT NAME </EventName>
    </button>
  );
}
