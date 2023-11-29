interface ButtonProps {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  icon: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type,
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex bg-primary text-background font-bold gap-2 px-8 py-2 justify-center ${className}`}
    >
      {text}
      {icon ? <i className={`material-symbols-outlined`}>{icon}</i> : null}
    </button>
  );
};

export default Button;
