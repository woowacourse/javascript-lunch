type ButtonProps = {
  id: string;
  text: string;
  type?: "button" | "submit";
  className?: string[];
  event?: (event: MouseEvent) => void;
  [key: string]: any;
};

const $button = ({
  id,
  text,
  type = "button",
  className = [],
  event,
  ...attrs
}: ButtonProps): HTMLButtonElement => {
  const button = document.createElement("button");
  button.id = id;
  button.innerText = text;
  button.type = type;
  button.classList.add(...className);

  if (event) {
    button.addEventListener("click", event);
  };

  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined) {
      if (typeof value === "boolean") {
        if (value) {
          button.setAttribute(key, "");
        }
      } else {
        button.setAttribute(key, value.toString());
      }
    }
  });

  return button;
};

export default $button;
