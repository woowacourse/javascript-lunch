import { ClickActions } from "../../constants/Events.js";
import { ILunchItem } from "../../type.ts";
import { createElement } from "../../utils/utils.ts";
import { StoreInfo } from "./StoreInfo.ts";

export function LunchItem({
  id,
  category,
  name,
  distance,
  description,
  link,
  isFavorite,
}: ILunchItem) {
  const li = createElement("li");
  li.classList.add("restaurant");
  li.setAttribute("data-action", ClickActions.SHOW_STORE_DELETE_MODAL);
  li.setAttribute("data-id", id);
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
    })}
  `;
    return li;
  }

  return render();
}
