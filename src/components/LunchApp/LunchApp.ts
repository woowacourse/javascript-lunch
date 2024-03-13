import "./LunchApp.css";

import BaseComponent from "../BaseComponent/BaseComponent";

class LunchApp extends BaseComponent {
  protected render() {
    try {
      this.innerHTML = `
          <global-navigation-bar></global-navigation-bar>
          <main>
            <section class="restaurant-filter-container"> 
              <category-dropdown></category-dropdown>         
              <sort-dropdown></sort-dropdown>
            </section>
            <restaurant-list></restaurant-list>
          </main>
          
          <restaurant-add-modal class="modal"></restaurant-add-modal>
        `;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

customElements.define("lunch-app", LunchApp);
