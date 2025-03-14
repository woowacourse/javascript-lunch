const validateEmptyString = (string: string | number, message: string) => {
  if (string === "") throw new Error(message);
};

export default validateEmptyString;
