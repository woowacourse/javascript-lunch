import createElementByTag from "./utils/createElementByTag";

const generateButton = ({
  value,
  classes = [],
  onclick = () => {},
}: {
  value: string;
  classes?: string[];
  onclick: (e: Event) => void;
}): HTMLButtonElement => {
  const button = createElementByTag({
    tag: "button",
    classes,
    contents: value,
  });

  if (!(button instanceof HTMLButtonElement)) {
    throw new Error("[ERROR] Button is not HTMLButtonElement");
  }

  button.addEventListener("click", onclick);
  return button;
};

export default generateButton;
