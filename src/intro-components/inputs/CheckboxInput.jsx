import React from "react";

export function CheckboxInput({ name, label, value, setChecked }) {
  return (
    <div>
      <div className="form-item checkbox-div">
        <label htmlFor={name} className="checkbox-container">
          {label}
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={value}
            onChange={() => setChecked((currentState) => !currentState)} //called in Intro
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}
