import createElementByTag from "../utils/createElementByTag";

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
  }) as HTMLButtonElement;
  button.addEventListener("click", onclick);
  return button;
};

export default generateButton;
