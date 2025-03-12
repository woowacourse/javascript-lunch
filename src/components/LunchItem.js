import { getHTML, createElement } from "../utils/utils.js";
import { CategoryIcon } from "./common/CategoryIcon.js";
import { StoreInfo } from "./StoreInfo.js";

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

export function LunchItem({
  targetID,
  category,
  name,
  distance,
  description,
  link,
}) {
  const li = createElement("li");
  li.classList.add("restaurant");

  function render() {
    li.innerHTML = `
    ${CategoryIcon(category)}
    ${StoreInfo({
      category,
      name,
      distance,
      description,
      link,
      type: "summary",
    })}
  `;
    return li;
  }

  return render();
}
