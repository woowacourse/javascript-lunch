const $textarea = ( {attribute} ) => {
  const textarea = document.createElement("textarea");

  Object.assign(textarea, attribute);

  return textarea;
};

export default $textarea;
