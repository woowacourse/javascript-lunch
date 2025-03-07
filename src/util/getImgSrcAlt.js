export function getImgSrcAlt(category) {
  switch (category) {
    case "한식":
      return { imgAlt: "한식", imgSrc: "./category-korean.png" };
    case "중식":
      return { imgAlt: "중식", imgSrc: "./category-chinese.png" };
    case "일식":
      return { imgAlt: "일식", imgSrc: "./category-japanese.png" };
    case "양식":
      return { imgAlt: "양식", imgSrc: "./category-western.png" };
    case "아시안":
      return { imgAlt: "아시안", imgSrc: "./category-asian.png" };
    default:
      return { imgAlt: "기타", imgSrc: "./category-etc.png" };
  }
}
