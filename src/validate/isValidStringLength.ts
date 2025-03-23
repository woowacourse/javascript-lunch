export const isValidStringLength = (
  str: string,
  { min, max }: { min: number; max: number }
) => {
  return str.length >= min && str.length <= max;
};
