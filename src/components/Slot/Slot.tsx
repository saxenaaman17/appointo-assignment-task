import { FaRegCircleCheck } from "react-icons/fa6";
import styles from "./Slot.module.css";

interface SlotProps {
  value: string;
  isSelected?: boolean;
  onClick: (value: string) => void;
}

const Slot = ({ value, isSelected = false, onClick }: SlotProps) => {
  return (
    <div
      className={`${styles.slot} ${isSelected ? styles.selected : ""}`}
      onClick={() => onClick(value)}
    >
      {value}
      {isSelected && <FaRegCircleCheck size={25} />}
    </div>
  );
};

export default Slot;
