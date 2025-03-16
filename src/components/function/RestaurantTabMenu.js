import { getHTML } from "../../utils/utils.ts";
import { TabMenu } from "../common/TabMenu.js";

export function RestaurantTabMenu(targetID) {
  function render() {
    getHTML(targetID).innerHTML = "";
    getHTML(targetID).innerHTML = `
            ${TabMenu()}
        `;
  }
  return render();
}
