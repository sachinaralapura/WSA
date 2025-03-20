import clsx from "clsx";
import React from "react";
import CustomDatePicker from "./CustomDatePicker";

export default function InputField({
  name,
  label,
  type,
  inputImg,
  placeHolder,
  className,
  value,
  onChange,
}) {
  return (
    <div className={clsx("input-field-container", className)}>
      <p className="input-label">{label}</p>
      <div
        className={clsx(
          "input-wrapper",
          type === "textarea" && "textarea-wrapper"
        )}
      >
        <img
          src={inputImg}
          alt={`${label} icon`}
          className={"input-field-img"}
        />
        {type === "date" ? (
          <CustomDatePicker name={name} date={value} onDateChange={onChange} />
        ) : type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
            className={"textarea-field-input"}
            rows={3}
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            placeholder={placeHolder}
            onChange={onChange}
            className={"input-field-input"}
          />
        )}
      </div>
    </div>
  );
}
