const $input = (inputInfo) => {
  const input = document.createElement("input");

  Object.assign(input, inputInfo.attribute);

  if (inputInfo.eventType && inputInfo.event) {
    input.addEventListener(inputInfo.eventType, inputInfo.event);
  }

  return input;
};

export default $input;
