import { REGEX } from "./constants";

const Validator = {
  name(name: string) {
    return !REGEX.NAME.test(name.trim());
  },

  url(link: string) {
    return !REGEX.URL.test(link);
  },
};

export default Validator;
