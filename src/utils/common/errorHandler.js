const errorHandler = (validator, input) => {
  try {
    validator.checkName(input.name);
    if (input.description) validator.checkDescription(input.description);
    if (input.link) validator.checkLinkFormat(input.link);
  } catch (err) {
    alert(err);
  }
};

export default errorHandler;
