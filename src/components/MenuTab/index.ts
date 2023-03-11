import styleClass from "../../constants/styleClass";
import { onChangeMenuTabs } from "./handleMenuTab";

class MenuTab extends HTMLElement {
  constructor() {
    super();
    this.render();
    onChangeMenuTabs();
  }
  render() {
    this.innerHTML = `
      <form id="menuTabForm" class="d-flex justify-content-between mx-2 my-1">
        <label class="${styleClass.tab.menu} w-100 ${styleClass.text.center} py-1">  
          <input type="radio" name="tab-menu" value="tab-all" checked>
          모든 음식점
        </label>
        <label class="${styleClass.tab.menu} w-100 ${styleClass.text.center} py-1">
          <input type="radio" name="tab-menu" value="tab-favorites">
          자주 가는 음식점
        </label>
      </form>
    `;
  }
}
export default MenuTab;
