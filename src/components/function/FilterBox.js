import { SelectBox } from "../common/SelectBox.js";

export function FilterBox() {
  return `
        ${SelectBox({
          id: "cartegoryFilter",
          name: "cartegoryFilter",
          optionName: "sortCategory",
          onChange: "categoryFilter-change",
        })}
        ${SelectBox({
          id: "sortFilter",
          name: "sortFilter",
          optionName: "sortOption",
          onChange: "sortFilter-change",
        })}
    `;
}
