export const compareString = (a: string, b: string): number => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

export const validateBlankString = (str: string): boolean => {
  if (str.trim().length === 0) return false;

  return true;
};
