export const validateEmptyString = (string: string, message: string) => {
  if (string === "") throw new Error(message);
};
