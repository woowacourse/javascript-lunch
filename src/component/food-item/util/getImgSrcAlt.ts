import { CategoryType } from "../../../types/food";

const categoryMap = {
  한식: { imgAlt: "한식", imgSrc: "./category-korean.png" },
  중식: { imgAlt: "중식", imgSrc: "./category-chinese.png" },
  일식: { imgAlt: "일식", imgSrc: "./category-japanese.png" },
  양식: { imgAlt: "양식", imgSrc: "./category-western.png" },
  아시안: { imgAlt: "아시안", imgSrc: "./category-asian.png" },
  기타: { imgAlt: "기타", imgSrc: "./category-etc.png" },
};

export function getImgSrcAlt(category: CategoryType) {
  return categoryMap[category] || categoryMap["기타"];
}
