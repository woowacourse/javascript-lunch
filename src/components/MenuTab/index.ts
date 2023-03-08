import { onChangeMenuTabs } from "./handleMenuTab";

class MenuTab extends HTMLElement {
  constructor() {
    super();
    this.render();
    onChangeMenuTabs();
  }
  render() {
    this.innerHTML = `
      <form id="menuTabForm">
        <label>  
          <input type="radio" name="tab-menu" value="tab-all" checked>
          모든 음식점
        </label>
        <label>
          <input type="radio" name="tab-menu" value="tab-favorites">
          자주 가는 음식점
        </label>
      </form>
    `;
  }
}
export default MenuTab;
