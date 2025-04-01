import { forwardRef } from "react";
import clsx from "clsx";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDatePicker({
  name,
  date,
  onDateChange,
  isClear = true,
}) {
  return (
    <div className="input-field-datepicker">
      <DatePicker
        name={name}
        selected={date}
        onChange={onDateChange}
        isClearable={isClear}
        customInput={<CustomInput />}
        showMonthDropdown
        showYearDropdown
        scrollableYearDropdown
        dropdownMode="select"
      />
    </div>
  );
}

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button
    className={clsx(
      "datepicker-btn",
      value ? "date-input-value" : "date-input-placeholder"
    )}
    onClick={onClick}
    ref={ref}
  >
    {value ? moment(value).format("DD MMM YYYY") : "Due Date"}
  </button>
));
