import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

const alertConfig = {
  success: {
    color: "#22C55E",
    icon: FaCheck,
    time: 4000
  },
  removing: {
    color: "#6B7280",
    icon: FaTrash,
    time: 3500
  },
  warning: {
    color: "#EAB308",
    icon: IoIosWarning,
    time: 8000
  },
  error: {
    color: "#EF4444",
    icon: RxCrossCircled,
    time: 5000
  }
} as const;

export default alertConfig;