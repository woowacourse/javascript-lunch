type ButtonProps = {
  id: string;
  text: string;
  type?: "button" | "submit";
  className?: string[];
  event?: (event: MouseEvent) => void;
};

const $button = ({
  id,
  text,
  type = "button",
  className = [],
  event,
}: ButtonProps): HTMLButtonElement => {
  const button = document.createElement("button");
  button.id = id;
  button.innerText = text;
  button.type = type;
  button.classList.add(...className);

  if (event) {
    button.addEventListener("click", event);
  }

  return button;
};

export default $button;
