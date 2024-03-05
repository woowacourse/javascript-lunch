export const validateInRange = (value, min, max) => {
    if (value < min || value > max)
      throw new Error(`값이 ${min}이상 ${max}이하여야 합니다.`);
  }
