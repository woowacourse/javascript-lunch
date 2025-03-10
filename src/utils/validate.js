import modalInputRules from "../constants/modalInputRules.js";
import errorMessage from "../constants/message.js";

const validate = {
  emptySelector: (value) => {
    if (value === "") throw new Error(errorMessage.EMPTY_SELECTOR);
  },
  nameLength: (name) => {
    if (
      name.length > modalInputRules.MAX_NAME_LENGTH ||
      name.length < modalInputRules.MIN_NAME_LENGTH
    )
      throw new Error(errorMessage.NAME_LENGTH);
  },
  descLength: (desc) => {
    if (desc.length > modalInputRules.MAX_DESC_LENGTH)
      throw new Error(errorMessage.DESC_LENGTH);
  },
  linkForm: (link) => {
    if (link.length !== 0 && !modalInputRules.LINK_REGEX.test(link))
      throw new Error(errorMessage.LINK_FORM);
  },
};

export default validate;
