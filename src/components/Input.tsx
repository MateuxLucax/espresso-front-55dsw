import React, { HTMLInputTypeAttribute } from "react";

interface InputProps {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  value: string | readonly string[] | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  readOnly,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <input
        type={type}
        value={value}
        className="border-black border-2 bg-transparent text-black p-2 placeholder-black"
        id={id}
        required={required}
        readOnly={readOnly}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
