const throwError = ({ condition, message }) => {
  if (condition) {
    throw new Error(message);
  }
};

export default throwError;
