import Validator from "./Validator";

const inputCheck = (name: string, link: string) => {
  if (Validator.isEmptyName(name))
    throw new Error("[ERROR] 이름은 한 글자 이상이어야 합니다.");
  if (!Validator.isCorrectLink(link))
    throw new Error("[ERROR] 올바른 URL을 입력해 주세요.");
};

export default inputCheck;
