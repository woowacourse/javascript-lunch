const $textarea = (textareaInfo) => {
  const textarea = document.createElement("textarea");

  Object.assign(textarea, textareaInfo.attribute);

  return textarea;
};

export default $textarea;
