import { IconButton } from "../../component/button/IconButton.js";
import { Header } from "../../component/layout/Header.js";
import { LoadFoodListType } from "../../types/domain/LoadFoodListType.js";

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

export default function loadFoodListPage({ title }: LoadFoodListType) {
  const AddFoodItemIcon = IconButton({
    imgSrc: "./add-button.png",
    label: "음식점 추가",
    onClick: () => {},
  });

  //load header / main
  const body = document.querySelector("body");
  const main = document.createElement("main");
  body?.append(Header({ title, icon: AddFoodItemIcon }), main);

  //load FavoriteButton
  const tabButtonContainer = document.createElement("div");
  tabButtonContainer.className = "tab-button";
  tabButtonContainer.innerHTML = `
        <button class="tab-button_all"> 모든 음식점 </button>
        <button class="tab-button_favorite"> 자주 가는 음식점 </button>
    `;

  //load Filter
  const FilterContainer = document.createElement("section");
  FilterContainer.className = "restaurant-filter-container";
  FilterContainer.innerHTML = /*html */ `
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

  //load FoodList
  const container = document.createElement("div");
  container.className = "restaurant-list-container";
  container.innerHTML = `
      <ul class="restaurant-list">
      </ul>
    `;

  main.append(tabButtonContainer, FilterContainer, container);
  // main.append(FilterContainer);
  // main.appendChild(container);
}
