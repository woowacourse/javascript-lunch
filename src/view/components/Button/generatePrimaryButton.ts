import generateButton, { ButtonProps } from "./generateButton";

const generatePrimaryButton = ({ value, onClickHandler }: ButtonProps) => {
  const primaryButton = generateButton({
    value,
    classes: ["button", "button--primary", "text-caption"],
    onClickHandler,
  });

  return primaryButton;
};

export default generatePrimaryButton;
