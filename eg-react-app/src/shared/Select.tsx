import React from "react"; // This is COMPLETELY unnecessary as of React 17!

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  id: string;
  options: Array<Option>;
};

export function Select(props: SelectProps) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <select id={props.id}>
        {props.options.map((op) => {
          return (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
