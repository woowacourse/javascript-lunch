import { ILunchItem } from "../type.ts";
import { createElement } from "../utils/utils.ts";
import { CategoryIcon } from "./common/CategoryIcon.js";
import { StoreInfo } from "./StoreInfo.ts";

export function LunchItem(
  { category, name, distance, description, link, isFavorite }: ILunchItem,
  index: string
) {
  const li = createElement("li");
  li.classList.add("restaurant");
  li.setAttribute("data-action", "showStoreDeleteModal");
  li.setAttribute("data-index", index);

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
