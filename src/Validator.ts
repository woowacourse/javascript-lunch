import { REGEX } from "./constants";

const Validator = {
  validateName(name: string) {
    return !REGEX.NAME.test(name);
  },
};

export default Validator;
