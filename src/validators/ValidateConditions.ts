const ValidateConditions = {
  isIncluded<T>(array: Array<T>, value: T): boolean {
    return array.includes(value);
  },

  isBlank(value: string | number) {
    return value === '';
  },
};

export default ValidateConditions;
