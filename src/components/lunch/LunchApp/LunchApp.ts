import "./LunchApp.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

class LunchApp extends BaseComponent {
  protected render() {
    this.innerHTML = `
      <global-navigation-bar></global-navigation-bar>
      <main>
        <restaurant-tab class='restaurant-filter-container'></restaurant-tab>
      </main>
      <restaurant-add-modal></restaurant-add-modal>
      <restaurant-detail-modal></restaurant-detail-modal>
    `;
  }
}

customElements.define("lunch-app", LunchApp);
