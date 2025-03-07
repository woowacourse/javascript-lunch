import toThrowNewError from "./toThrowNewError.js";

const validateCategory = (category) => {
  toThrowNewError({
    condition: !category.trim(),
    message: "카테고리를 선택해주세요.",
  });

  toThrowNewError({
    condition: !["한식", "중식", "일식", "양식", "아시안", "기타"].includes(
      category
    ),
    message:
      "카테고리는 한식, 중식, 일식, 양식, 아시안, 기타 중 하나여야 합니다.",
  });
};

export default validateCategory;
