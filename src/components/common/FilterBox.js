import { ChangeActions } from "../../components-event/constants/Events.js";
import { SelectBox } from "./SelectBox.js";

export function FilterBox() {
  return `
        ${SelectBox({
          id: "cartegoryFilter",
          name: "cartegoryFilter",
          optionName: "sortCategory",
          onChange: ChangeActions.SORT_FILTER,
        })}
        ${SelectBox({
          id: "sortFilter",
          name: "sortFilter",
          optionName: "sortOption",
          onChange: ChangeActions.CATEGORY_FILTER,
        })}
    `;
}
