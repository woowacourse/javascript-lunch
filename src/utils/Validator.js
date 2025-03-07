const ValidationUtils = {
  isEmpty: (string) => string.trim().length === 0,
  isValidURL: (string) => {
    const expUrl = /https?:\/\/[^\s"]/;
    return expUrl.test(string);
  },
};

const Validator = {
  category: (string) => {
    if (ValidationUtils.isEmpty(string))
      throw new Error("카테고리를 선택해주세요.");
  },
  location: (string) => {
    if (ValidationUtils.isEmpty(string))
      throw new Error("거리(도보 이동 시간)을 선택해주세요.");
  },
  reference: (string) => {
    if (!ValidationUtils.isValidURL(string) && !ValidationUtils.isEmpty(string))
      throw new Error("https를 포함한 올바른 링크를 입력해주세요.");
  },
};

export default Validator;
