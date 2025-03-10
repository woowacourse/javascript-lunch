type InputProps = {
  attribute?: Partial<HTMLInputElement>;
};

const $input = ({ attribute = {} }: InputProps): HTMLInputElement => {
  const input = document.createElement("input");

  Object.assign(input, attribute);

  return input;
};

export default $input;
