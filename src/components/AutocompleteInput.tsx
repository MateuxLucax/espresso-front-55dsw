import { useState } from "react";

interface AutoCompleteInputProps {
  options: string[];
  className?: string;
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function AutocompleteInput({
  options,
  className,
  id,
  label,
  placeholder,
  value,
  onChange,
  required,
}: AutoCompleteInputProps) {
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );

  const handleOptionClick = (option: string) => {
    onChange(option);
    setShowOptions(false);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          autoComplete="off"
          type="text"
          className="w-full border-black border-2 bg-transparent text-black p-2 placeholder-black focus:outline-none"
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={(e) => {
            onChange(e.target.value);
            if (!showOptions) setShowOptions(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowOptions(false);
            }, 100);
          }}
        />
        {showOptions && value && filteredOptions.length > 0 && (
          <ul className="absolute z-10 w-full bg-primary text-background font-semibold mt-0 border-l-2 border-r-2 border-b-2 border-secondary max-h-36 overflow-y-scroll">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:opacity-75"
                onClick={() => {
                  handleOptionClick(option);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
