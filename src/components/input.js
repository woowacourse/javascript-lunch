const $input = (inputInfo) => {
  const input = document.createElement("input");

  Object.assign(input, inputInfo.attribute);

  return input;
};

export default $input;
