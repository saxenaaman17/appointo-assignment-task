import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import styles from "./Dropdown.module.css";

type Variant = "outlined" | "standard";

interface DropdownProps {
  label?: string;
  options: string[];
  value?: string;
  variant?: Variant;
  placeholder?: string;
  onChange?: (selectedOption: string) => void;
}

const Dropdown = ({
  label,
  options,
  variant,
  placeholder,
  value,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    setSelectedOption(value || options[0]);
  }, [value, options]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      {variant === "outlined" && (
        <label htmlFor="dropdown-input" className={styles.label}>
          {label}
        </label>
      )}
      <div
        id="dropdown-input"
        className={`${styles.dropdown} ${isOpen ? styles.open : ""} ${
          variant === "outlined" ? styles.outlined : ""
        }`}
        onClick={toggleDropdown}
      >
        {placeholder ? (
          <span className={styles.placeholderText}>{placeholder}</span>
        ) : (
          <span className={styles.selectedOption}>{selectedOption}</span>
        )}
        <i className={styles.icon}>
          <RiArrowDropDownLine />
        </i>
        {isOpen && (
          <div className={styles.dropdownOptions}>
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                className={styles.dropdownOption}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
