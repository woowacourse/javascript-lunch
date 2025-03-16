import { ILunchItem } from "../../type.ts";
import { createElement } from "../../utils/utils.ts";
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
    ${StoreInfo({
      category,
      name,
      distance,
      description,
      link,
      type: "summary",
      isFavorite,
      index,
    })}
  `;
    return li;
  }

  return render();
}
