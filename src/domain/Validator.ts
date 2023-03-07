import { REGEXR } from "../constant/regexr";

const Validator = {
  isValidName(name: string, list: string[]) {
    this.filledWithBlank(name);
    this.isDuplicatedName(name, list);
  },

  filledWithBlank(name: string) {
    if (REGEXR.FILLED_WITH_BLANK.test(name)) throw new Error("음식점 이름이 빈칸으로만 이루어져있습니다.");
  },

  isDuplicatedName(name: string, list: string[]) {
    if (list.includes(name)) throw new Error("동일한 이름의 음식점이 존재합니다.");
  },
};

export default Validator;
