import "./LunchApp.css";

import BaseComponent from "../BaseComponent/BaseComponent";

class LunchApp extends BaseComponent {
  protected render() {
    this.innerHTML = `
          <global-navigation-bar></global-navigation-bar>
          <main>
            <section class="restaurant-filter-container">
              <category-dropdown></category-dropdown>            
              <sort-dropdown></sort-dropdown>
            </section>
            <restaurant-list></restaurant-list>
          </main>
        `;
  }

  protected setEvent(): void {}
}

customElements.define("lunch-app", LunchApp);
