import { IconButton } from "../../component/button/IconButton.js";
import { SelectFilter } from "../../component/input/SelectFilter.js";
import { Header } from "../../component/layout/Header.js";
import { LoadFoodListType } from "../../types/domain/LoadFoodListType.js";

const categoryFilter = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];
const sortingFilter = ["이름순", "거리순"];

export default function loadFoodListPage({ title }: LoadFoodListType) {
  const AddFoodItemIcon = IconButton({
    imgSrc: "./add-button.png",
    label: "음식점 추가",
    onClick: () => {},
  });

  // header, main 생성
  const body = document.querySelector("body");
  const main = document.createElement("main");
  body?.append(Header({ title, icon: AddFoodItemIcon }), main);

  // 즐겨찾기 버튼 생성
  const tabButtonContainer = document.createElement("div");
  tabButtonContainer.className = "tab-button";
  tabButtonContainer.innerHTML = `
        <button class="tab-button_all"> 모든 음식점 </button>
        <button class="tab-button_favorite"> 자주 가는 음식점 </button>
    `;

  // 필터 컨테이너 생성, 카테고리 & 정렬 필터 추가
  const FilterContainer = document.createElement("section");
  FilterContainer.className = "restaurant-filter-container";
  FilterContainer.append(
    SelectFilter({
      name: "category",
      id: "category-filter",
      options: categoryFilter,
    }),
    SelectFilter({
      name: "sorting",
      id: "sorting-filter",
      options: sortingFilter,
    })
  );

  // FoodList ul 태그 생성
  const container = document.createElement("div");
  container.className = "restaurant-list-container";
  container.innerHTML = `
      <ul class="restaurant-list">
      </ul>
    `;

  main.append(tabButtonContainer, FilterContainer, container);
}
