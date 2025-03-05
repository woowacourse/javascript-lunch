const inputOptions = {
  nameInput: {
    required: true,
    id: "name",
    name: "name",
    type: "text",
  },
  linkInput: {
    id: "link",
    name: "link",
    type: "text",
  },
};

const $input = (inputName) => {
  const input = document.createElement("input");

  Object.assign(input, inputOptions[inputName]);

  return input;
};

export default $input;
