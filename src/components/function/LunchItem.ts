import { ClickActions } from "../../components-event/constants/Events.js";
import { ILunchItem } from "../../type.ts";
import { toElement } from "../../utils/utils.ts";
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
  const li = toElement(`
    <li class="restaurant" data-id="${id}" data-action="${
    ClickActions.SHOW_STORE_DELETE_MODAL
  }">
    ${StoreInfo({
      id,
      category,
      name,
      distance,
      description,
      link,
      type: "summary",
      isFavorite,
    })}
    </li>
    `);
  return li;
}
