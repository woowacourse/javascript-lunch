import { getHTML, createElement } from "../utils/utils.js";
import { CategoryIcon } from "./common/CategoryIcon.js";
import { StoreInfo } from "./StoreInfo.js";

export function LunchItem({
  category,
  name,
  distance,
  description,
  link,
  isFavorite,
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
      isFavorite,
    })}
  `;
    return li;
  }

  return render();
}
