export const validateEmptyString = (string, message) => {
  if (string === "") throw new Error(message);
};
