import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  id: string;
  label?: string;
  type: HTMLInputTypeAttribute;
  value: string | readonly string[] | number | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
  error?: string;
  hint?: string;
  minLength?: number;
  maxLength?: number;
  style?: React.CSSProperties;
}

export default function Input({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  readOnly,
  className,
  error,
  hint,
  minLength,
  maxLength,
  style,
}: InputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label ? (
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
      ) : null}
      <input
        type={type}
        value={value}
        className={`border-black border-2 bg-transparent text-black p-2 placeholder-black focus:outline-none
          ${error && "border-red-500 text-red-500 placeholder:text-red-500"}
        `}
        id={id}
        required={required}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={minLength}
        max={maxLength}
        minLength={minLength}
        maxLength={maxLength}
        style={style}
      />
      {error ? <span className="text-red-500">{error}</span> : null}
      {hint && !error ? <span className="text-gray-500">{hint}</span> : null}
    </div>
  );
}
