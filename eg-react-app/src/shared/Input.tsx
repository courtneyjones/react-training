import React from "react"; // This is COMPLETELY unnecessary as of React 17!

type InputProps = {
  label: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: "text" | "number" | "email" | "phone" | "date";
};

export function Input({
  label,
  id,
  value,
  type = "text",
  onChange,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input id={id} type={type} value={value} onChange={onChange} />
    </div>
  );
}
