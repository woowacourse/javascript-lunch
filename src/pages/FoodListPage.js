import { Header } from "../component/layout/Header.js";
import { Modal } from "../component/layout/Modal.js";

export class FoodListPage {
  #body;

  constructor(title, iconButton = null) {
    this.loadHeader(title, iconButton);
    this.loadMain();
    this.loadFoodList();
  }

  loadHeader(title, iconButton) {
    this.#body = document.querySelector("body");
    if (iconButton) {
      this.#body.appendChild(Header({ title, icon: iconButton }));
    } else {
      this.#body.appendChild(Header({ title }));
    }
  }

  loadMain() {
    const main = document.createElement("main");
    this.#body.appendChild(main);
  }

  loadFoodList() {
    const main = document.querySelector("main");
    main.innerHTML = `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      </ul>
    </section>
    `;
  }
}
