import errorMessage from "../constants/message.js";
import RESTAURANT_ADD_FORM_INPUT_RULES from "../constants/restaurantAddForm/modalInputRules.js";

const validate = {
  emptySelector: (value) => {
    if (value === "") throw new Error(errorMessage.EMPTY_SELECTOR);
  },
  nameLength: (name) => {
    if (
      name.length > RESTAURANT_ADD_FORM_INPUT_RULES.MAX_NAME_LENGTH ||
      name.length < RESTAURANT_ADD_FORM_INPUT_RULES.MIN_NAME_LENGTH
    )
      throw new Error(errorMessage.NAME_LENGTH);
  },
  descLength: (desc) => {
    if (desc.length > RESTAURANT_ADD_FORM_INPUT_RULES.MAX_DESC_LENGTH)
      throw new Error(errorMessage.DESC_LENGTH);
  },
  linkForm: (link) => {
    if (
      link.length !== 0 &&
      !RESTAURANT_ADD_FORM_INPUT_RULES.LINK_REGEX.test(link)
    )
      throw new Error(errorMessage.LINK_FORM);
  },
};

export default validate;
