import React from "react";
import "../form.css";

export function NumberInput({ name, label, value, setValue }) {
  return (
    <div className="form-item">
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </div>
  );
}
