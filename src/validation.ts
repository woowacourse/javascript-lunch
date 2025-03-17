const Validation = {
  isValidateOption(value: string | number): boolean {
    return value === 0 || !!value;
  },

  isValidateName(name: string): boolean {
    const NAME_LENGTH_MIN = 2;
    return name.length < NAME_LENGTH_MIN;
  },
};

export default Validation;
