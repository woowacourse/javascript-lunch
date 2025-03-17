const Validation = {
  isValidateOption(value: string | number): boolean {
    return !value;
  },

  isValidateName(name: string): boolean {
    const NAME_LENGTH_MIN = 2;
    return name.length < NAME_LENGTH_MIN;
  },
};

export default Validation;
