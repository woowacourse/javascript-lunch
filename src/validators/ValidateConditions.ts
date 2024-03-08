const ValidateConditions = {
  isIncluded<T extends string | number>(array: Array<T>, value: T): boolean {
    return array.includes(value);
  },

  isBlank(value: string) {
    return value === '';
  },
};

export default ValidateConditions;
