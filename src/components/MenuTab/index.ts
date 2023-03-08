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
        <input type="radio" name="tab-menu" value="tab-all" checked>
        <input type="radio" name="tab-menu" value="tab-favorites">
      </form>
    `;
  }
}
export default MenuTab;
