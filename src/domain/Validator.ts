import { REGEXR } from "../constant/regexr";

const Validator = {
  filledWithBlank(name: string) {
    if (REGEXR.FILLED_WITH_BLANK.test(name)) {
      throw new Error("음식점 이름이 빈칸으로만 이루어져있습니다.");
    }
  },
};

export default Validator;
