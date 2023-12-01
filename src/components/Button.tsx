interface ButtonProps {
  text?: string;
  type?: "submit" | "reset" | "button" | undefined;
  icon?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  text,
  type,
  icon,
  onClick,
  className,
  loading,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex bg-primary text-background font-bold gap-2 px-8 py-2 justify-center disabled:opacity-60 hover:opacity-80 active:opacity-70 ${className}`}
    >
      {text}
      {icon && !loading ? (
        <i className="material-symbols-outlined">{icon}</i>
      ) : null}
      {loading ? (
        <i className="material-symbols-outlined animate-spin">
          progress_activity
        </i>
      ) : null}
    </button>
  );
}
