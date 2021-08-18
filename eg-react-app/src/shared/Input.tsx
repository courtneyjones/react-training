import React from "react"; // This is COMPLETELY unnecessary as of React 17!

type InputProps = {
  label: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function Input(props: InputProps) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input
        id={props.id}
        type="text"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
