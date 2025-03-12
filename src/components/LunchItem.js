import { getHTML, createElement } from "../utils/utils.js";
import { CategoryIcon } from "./common/CategoryIcon.js";
import { StoreInfo } from "./StoreInfo.js";

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
