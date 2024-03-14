export const getCategoryImageSource = (category: string) => {
  switch (category) {
    case "한식":
      return "./category-korean.png";
    case "중식":
      return "./category-chinese.png";
    case "일식":
      return "./category-japanese.png";
    case "양식":
      return "./category-western.png";
    case "아시안":
      return "./category-asian.png";
    case "기타":
      return "./category-etc.png";
    default:
      throw new Error("카테고리가 올바른지 확인하세요" + category);
  }
};
