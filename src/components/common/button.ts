type ButtonProps = {
  text: string;
  type?: "button" | "submit";
  className?: string[];
  event?: (event: MouseEvent) => void;
};

const $button = ({ text, type = "button", className = [], event }: ButtonProps): HTMLButtonElement => {
  const button = document.createElement("button");
  button.innerText = text;
  button.type = type;
  button.classList.add(...className);

  if (event) {
    button.addEventListener("click", event);
  }

  return button;
};

export default $button;
