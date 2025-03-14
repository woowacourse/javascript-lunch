import { Header } from "../component/layout/Header.js";
import { Modal } from "../component/layout/Modal.js";
import { Filter } from "../domain/Filter.js";

const categoryFilter = [
  { value: "전체", text: "전체" },
  { value: "한식", text: "한식" },
  { value: "중식", text: "중식" },
  { value: "일식", text: "일식" },
  { value: "양식", text: "양식" },
  { value: "아시안", text: "아시안" },
  { value: "기타", text: "기타" },
];

const sortingFilter = [
  { value: "이름순", text: "이름순" },
  { value: "거리순", text: "거리순" },
];

export class FoodListPage {
  #body;
  #main;

  constructor(title, iconButton = null) {
    this.loadHeader(title, iconButton);
    this.loadMain();
    this.loadTabButton();
    this.loadFilter();
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
    this.#main = document.createElement("main");
    this.#body.appendChild(this.#main);
  }

  loadTabButton() {
    const container = document.createElement("div");
    container.innerHTML = `
      <div class="tab-button">
        <button class="tab-button_all"> 모든 음식점 </button>
        <button class="tab-button_favorite"> 자주 가는 음식점 </button>
      </div>
    `;
    this.#main.appendChild(container.firstElementChild);
  }

  loadFilter() {
    const container = document.createElement("div");
    container.innerHTML = `
          <section class="restaurant-filter-container">
          <select name="category" id="category-filter" class="restaurant-filter">
          ${categoryFilter.map(
            ({ value, text }) => `<option value=${value}>${text}</option>`
          )}
          </select>

          <!-- 정렬 셀렉트 박스 -->
          <select name="sorting" id="sorting-filter" class="restaurant-filter">
          ${sortingFilter.map(
            ({ value, text }) => `<option value=${value}>${text}</option>`
          )}
          </select>
        </section>
    `;
    this.#main.appendChild(container.firstElementChild);
  }

  loadFoodList() {
    const container = document.createElement("div");
    container.innerHTML = `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      </ul>
    </section>
    `;
    this.#main.appendChild(container.firstElementChild);
  }
}
