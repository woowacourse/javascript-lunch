type ButtonProps = {
  type?: "button" | "submit" | "reset";
  id?: string;
  className?: string;
  text: string;
  onClick?: () => void;
};

const createButton = ({
  type = "button",
  id,
  className,
  text,
  onClick,
}: ButtonProps) => {
  const button = document.createElement("button");
  button.type = type;
  if (id) button.id = id;
  if (className) button.className = className;
  button.textContent = text;

  if (onClick) {
    button.addEventListener("click", onClick);
  }

  return button;
};

export { createButton };
