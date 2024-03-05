import "./LunchApp.css";

import BaseComponent from "../BaseComponent/BaseComponent";

class LunchApp extends BaseComponent {
  protected render() {
    this.innerHTML = `
          <global-navigation-bar></global-navigation-bar>
          <main>
            <section class="restaurant-filter-container">
              <category-dropdown></category-dropdown>            
              <select name="sorting" id="sorting-filter" class="restaurant-filter">
                <option value="name">이름순</option>
                <option value="distance">거리순</option>
              </select>
            </section>
          </main>
        `;
  }

  protected setEvent(): void {}
}

customElements.define("lunch-app", LunchApp);
