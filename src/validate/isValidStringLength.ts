export const isValidStringLength = (
  str: string,
  { min, max }: { min: number; max: number }
): boolean => {
  return str.length >= min && str.length <= max;
};
