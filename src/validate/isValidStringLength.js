export const isValidStringLength = (str, { min, max }) => {
  return str.length >= min && str.length <= max;
};
