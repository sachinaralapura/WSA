import clsx from "clsx";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { arrowDown } from "../../assets/asset";

export default function DropdownSortBy({
  value,
  onChange,
  options,
  placeholder,
}) {
  // state to manage menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selectRef = useRef(null);

  const toggleMenuDisplay = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // close the menu when clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionChange = useCallback(
    function (option) {
      onChange(option);
      setIsMenuOpen(false);
    },
    [onChange]
  );

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  return (
    <div ref={selectRef} className="dropdown-container">
      <div className="value-container" onClick={toggleMenuDisplay}>
        <span
          className={clsx("dropdown-value", !value && "dropdown-placeholder")}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <img src={arrowDown} alt="dropdown Icon" />
      </div>
      {isMenuOpen && (
        <div className="menu-list">
          {options.map((option) => {
            return (
              <div
                className="menu-list-option"
                key={option.value + "-option"}
                onClick={() => handleOptionChange(option.value)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
