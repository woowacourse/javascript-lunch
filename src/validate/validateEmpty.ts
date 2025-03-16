export const validateEmpty = (string: string | number, message: string) => {
  if (string === "") throw new Error(message);
};
