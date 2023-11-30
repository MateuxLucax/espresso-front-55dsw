interface TextAreaProps {
  id: string;
  label: string;
  value: string | readonly string[] | number | undefined;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
  error?: string;
  hint?: string;
  maxLength?: number;
}

export default function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  readOnly,
  className,
  error,
  hint,
  maxLength,
}: TextAreaProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <textarea
        value={value}
        maxLength={maxLength}
        className={`border-black border-2 bg-transparent text-black p-2 placeholder-black focus:outline-none resize-y overflow-y-scroll
          ${error && "border-red-500 text-red-500 placeholder:text-red-500"}
        `}
        id={id}
        required={required}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          minHeight: "8rem",
          maxHeight: "16rem",
        }}
      />
      {error ? <span className="text-red-500">{error}</span> : null}
      {hint && !error ? <span className="text-gray-500">{hint}</span> : null}
    </div>
  );
}
