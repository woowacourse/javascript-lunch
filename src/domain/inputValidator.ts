import { URL_REGEX } from "../constants";

export const inputValidator = {
  validateName: (nameInput: string) => {
    if (nameInput.trim().length == 0) {
      throw new Error("[ERROR] 이름을 입력해주세요.");
    }
    return nameInput;
  },
  validateLink: (linkInput: string) => {
    if (linkInput.trim().length != 0 && !URL_REGEX.test(linkInput)) {
      throw new Error("[ERROR] 유효한 링크를 입력해주세요.");
    }
    return linkInput;
  },
};
