import React from "react";

export function SelectInput({ name, label, value, options, setValue }) {
  return (
    <div className="form-item">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            All {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
