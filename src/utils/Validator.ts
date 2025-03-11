import { RESTAURANT_NAME_LENGTH_MAX } from "../constants/constants.ts";
import { DESCRIPTION_LENGTH_MAX } from "../constants/constants.ts";
import { ERROR_MESSAGE } from "../constants/constants.ts";


export const Validator = {
  name(name: string) {
    if (name.length > RESTAURANT_NAME_LENGTH_MAX) {
      throw new Error(ERROR_MESSAGE.NAME_LENGTH_MAX);
    }
  },

  description(description: string) {
    if (description.length > DESCRIPTION_LENGTH_MAX) {
      throw new Error(ERROR_MESSAGE.DESCRIPTION_MAX);
    }
  },

  link(link: string) {
    const urlRegex = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;
    if (!urlRegex.test(link)) {
      throw new Error(ERROR_MESSAGE.LINK);
    }
  },
};
