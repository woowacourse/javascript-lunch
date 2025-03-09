const $input = ({ attribute }) => {
  const input = document.createElement("input");

  Object.assign(input, attribute);

  return input;
};

export default $input;
