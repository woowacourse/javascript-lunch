import form from "../constants/form.js";
import errorMessage from "../constants/message.js";

const validate = {
  nameLength: (name) => {
    if (
      name.length > form.MAX_NAME_LENGTH ||
      name.length < form.MIN_NAME_LENGTH
    )
      throw new Error(errorMessage.NAME_LENGTH);
  },
  descLength: (desc) => {
    if (desc.length > form.MAX_DESC_LENGTH)
      throw new Error(errorMessage.DESC_LENGTH);
  },
  linkForm: (link) => {
    if (link.length !== 0 && !form.LINK_REGEX.test(link))
      throw new Error(errorMessage.LINK_FORM);
  },
};

export default validate;
