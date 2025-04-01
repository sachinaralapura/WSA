import React from "react";

export default function CheckBox({ label, onClick }) {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={label}
        onClick={onClick}
        className="checkbox-input"
      />
      <label className="checkbox-label" htmlFor={label}>
        {label}
      </label>
    </div>
  );
}
