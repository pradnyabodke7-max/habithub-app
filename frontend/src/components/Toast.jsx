import { useEffect } from "react";
import { CircleCheck, CircleAlert } from "lucide-react";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`} role="status">
      {type === "error" ? <CircleAlert size={18} /> : <CircleCheck size={18} />}
      {message}
    </div>
  );
}