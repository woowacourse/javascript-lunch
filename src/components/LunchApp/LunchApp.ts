import "./LunchApp.css";

import BaseComponent from "../BaseComponent/BaseComponent";

class LunchApp extends BaseComponent {
  protected render() {
    try {
      this.innerHTML = `
          <global-navigation-bar></global-navigation-bar>
          <main>
            <restaurant-tab-container></restaurant-tab-container>
            <section class="selected-list-container">
            </section>
          </main>
          
          <restaurant-add-modal class="modal"></restaurant-add-modal>
        `;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}

customElements.define("lunch-app", LunchApp);
