const textareaOptions = {
  descriptionTextarea: {
    id: "description",
    name: "description",
    cols: "30",
    rows: "5",
  },
};

const $textarea = (textareaName) => {
  const textarea = document.createElement("textarea");

  Object.assign(textarea, textareaOptions[textareaName]);

  return textarea;
};

export default $textarea;
