import generateButton, { ButtonProps } from "./generateButton";

const generateSecondaryButton = ({ value, onClickHandler }: ButtonProps) => {
  const secondaryButton = generateButton({
    value,
    classes: ["button", "button--secondary", "text-caption"],
    onClickHandler,
  });

  return secondaryButton;
};

export default generateSecondaryButton;
