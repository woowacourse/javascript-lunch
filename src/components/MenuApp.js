import { initResaurantStorage } from "../domains/Restaurants";
import BaseComponent from "./BaseComponent.js";

class MenuApp extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    initResaurantStorage();
    this.render();
    this.setEvent();
  }

  render() {
    this.innerHTML = `
    <app-header></app-header>
    <main> 
        <section class="restaurant-filter-container">
            <option-selector type="category" options=${[
              "전체",
              "한식",
              "중식",
              "일식",
              "양식",
              "아시안",
              "기타",
            ]} ></option-selector>

            <option-selector type="sort" options=${[
              "이름순",
              "거리순",
            ]}></option-selector>
        </section>
        
        <restaurant-list></restaurant-list>
        <restaurant-add-form></restaurant-add-form>
    </main>
    
    `;
  }
}

customElements.define("menu-app", MenuApp);
