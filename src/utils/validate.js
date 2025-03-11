import formValidate from "../constants/form.js";
import errorMessage from "../constants/message.js";
import regex from "../constants/regex.js";

const validate = {
  emptySelector: (value) => {
    if (value === "") throw new Error(errorMessage.EMPTY_SELECTOR);
  },
  nameLength: (name) => {
    if (
      name.length > formValidate.MAX_NAME_LENGTH ||
      name.length < formValidate.MIN_NAME_LENGTH
    )
      throw new Error(errorMessage.NAME_LENGTH);
  },
  descLength: (desc) => {
    if (desc.length > formValidate.MAX_DESC_LENGTH)
      throw new Error(errorMessage.DESC_LENGTH);
  },
  linkForm: (link) => {
    if (link.length !== 0 && !regex.LINK_REGEX.test(link))
      throw new Error(errorMessage.LINK_FORM);
  },
};

export default validate;
