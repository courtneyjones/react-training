import React from "react"; // This is COMPLETELY unnecessary as of React 17!

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  id: string;
  options: Array<Option>;
  value: string;
};

// export function Select(props: SelectProps) { // original
//   const { id, label, options, value } = props; // original
export function Select({ id, label, options, value }: SelectProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <select id={id}>
        <option value=""></option>
        {options.map((op) => {
          return (
            <option
              selected={value === op.value}
              key={op.value}
              value={op.value}
            >
              {op.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
