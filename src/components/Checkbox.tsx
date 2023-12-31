interface CheckboxProps {
  id: string;
  text: string;
  onClick?: (value: boolean) => void;
  className?: string;
  checked?: boolean;
}

export default function Checkbox({
  id,
  text,
  onClick,
  className,
  checked,
}: CheckboxProps) {
  return (
    <div
      className={`w-full flex items-center cursor-pointer gap-2 ${className}`}
    >
      <input
        defaultChecked={checked}
        checked={checked}
        value={checked ? "on" : "off"}
        className="
          peer p-2 relative appearance-none shrink-0 w-6 h-6 border-2 border-primary rounded-sm bg-background
          focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-primary-100
          checked:bg-primary checked:border-0 cursor-pointer
          disabled:border-steel-400 disabled:bg-steel-400
        "
        type="checkbox"
        id="public"
        name={id}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick(e.currentTarget.checked);
        }}
      />
      <svg
        className="absolute w-4 h-4 ml-1 pointer-events-none hidden peer-checked:block stroke-white outline-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <label
        className="font-bold text-primary select-none cursor-pointer"
        htmlFor={id}
      >
        {text}
      </label>
    </div>
  );
}
