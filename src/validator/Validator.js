import { RESTAURANT_NAME_LENGTH_MAX } from "../constants/constants.js";
import { DESCRIPTION_LENGTH_MAX } from "../constants/constants.js";
import { ERROR_MESSAGE } from "../constants/constants.js";

export const Validator = {
  name(name) {
    if (name.length > RESTAURANT_NAME_LENGTH_MAX) {
      throw new Error(ERROR_MESSAGE.NAME_LENGTH_MAX);
    }
  },

  description(description) {
    if (description.length > DESCRIPTION_LENGTH_MAX) {
      throw new Error(ERROR_MESSAGE.DESCRIPTION_MAX);
    }
  },

  link(link) {
    const urlRegex = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;
    if (!urlRegex.test(link)) {
      throw new Error(ERROR_MESSAGE.LINK);
    }
  },
};
