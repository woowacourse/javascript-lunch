import { IconButton } from "../component/button/IconButton.js";
import { Header } from "../component/layout/Header.js";
import {
  FoodListPageType,
  LoadFoodListType,
  LoadHeaderType,
} from "../types/pages/FoodListPageType.js";

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
  #body: HTMLElement | null;
  #main: HTMLElement | null;

  constructor({ title, iconButton = null }: FoodListPageType) {
    this.#body = null;
    this.#main = null;
    this.loadHeader({ title, iconButton });
    this.loadMain();
    this.loadTabButton();
    this.loadFilter();
    this.loadFoodList();
  }

  static loadPage({ title }: LoadFoodListType) {
    const AddFoodItemIcon = IconButton({
      imgSrc: "./add-button.png",
      label: "음식점 추가",
      onClick: () => {},
    });

    return new FoodListPage({ title, iconButton: AddFoodItemIcon });
  }

  loadHeader({ title, iconButton }: LoadHeaderType) {
    this.#body = document.querySelector("body");
    if (iconButton) {
      this.#body?.appendChild(Header({ title, icon: iconButton }));
    } else {
      this.#body?.appendChild(Header({ title, icon: null }));
    }
  }

  loadMain() {
    this.#main = document.createElement("main");
    this.#body?.appendChild(this.#main);
  }

  loadTabButton() {
    const container = document.createElement("div");
    container.className = "tab-button";
    container.innerHTML = `
        <button class="tab-button_all"> 모든 음식점 </button>
        <button class="tab-button_favorite"> 자주 가는 음식점 </button>
    `;
    this.#main?.appendChild(container);
  }

  loadFilter() {
    const container = document.createElement("section");
    container.className = "restaurant-filter-container";
    container.innerHTML = `

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
    `;
    this.#main?.appendChild(container);
  }

  loadFoodList() {
    const container = document.createElement("div");
    container.className = "restaurant-list-container";
    container.innerHTML = `
      <ul class="restaurant-list">
      </ul>
    `;
    this.#main?.appendChild(container);
  }
}
