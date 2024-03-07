export const validateInRange = (min: number, max: number, value: number) => {
  if (value < min || value > max)
    throw new Error(`값이 ${min}이상 ${max}이하여야 합니다.`);
};

export const validateNumberBelow = (max: number, value: number) => {
  if (value > max) {
    throw new Error(`값이 ${max}이하여야 합니다.`);
  }
};
