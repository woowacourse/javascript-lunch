type TextareaProps = {
  attribute?: Partial<HTMLInputElement>;
};

const $textarea = ({ attribute = {} }: TextareaProps): HTMLTextAreaElement => {
  const textarea = document.createElement("textarea");

  Object.assign(textarea, attribute);

  return textarea;
};

export default $textarea;
