const toThrowNewError = ({ condition, message }) => {
  if (condition) {
    throw new Error(message);
  }
};

export default toThrowNewError;
