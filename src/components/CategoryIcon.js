import { createElement } from "../utils/utils.js";

function getCategoryImage(category) {
  switch (category) {
    case "한식":
      return "korean";
    case "중식":
      return "chinese";
    case "일식":
      return "japanese";
    case "양식":
      return "western";
    case "아시안":
      return "asian";
    case "기타":
      return "etc";
    default:
      return "etc";
  }
}
export function CategoryIcon(category) {
  function render() {
    return `
        <div class="restaurant__category">
            <img src="./images/category-${getCategoryImage(category)}.png" alt="${category}" class="category-icon">
        </div>
        `;
  }
  return render();
}
