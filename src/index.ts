import "../templates/style.css";
import {
  categories,
  categoryToIconNameMapper,
  distances,
  distancesMapper,
  sortingStandards,
  sortingStandardsMapper,
} from "./constants";
import RestaurantList from "./domain/RestaurantList";
import { Category, Distance, Restaurant, SortingStandard, Link } from "./types";
import "../templates/add-button.png";
import "../templates/category-asian.png";
import "../templates/category-chinese.png";
import "../templates/category-etc.png";
import "../templates/category-japanese.png";
import "../templates/category-korean.png";
import "../templates/category-western.png";
import "../templates/favorite-icon-filled.png";
import "../templates/favorite-icon-lined.png";

const restaurantList = new RestaurantList();

const $categoryFilter = document.querySelector(
  "#category-filter"
) as HTMLSelectElement;
const $sortingFilter = document.querySelector(
  "#sorting-filter"
) as HTMLSelectElement;
const $restaurantList = document.querySelector(
  "#restaurant-list"
) as HTMLUListElement;
const $addRestaurantButton = document.querySelector(
  "#add-restaurant__button"
) as HTMLButtonElement;
const $addRestaurantCancelButton = document.querySelector(
  "#add-restaurant-cancel__button"
) as HTMLButtonElement;
const $addRestaurantFormModal = document.querySelector(
  "#add-restaurant-form__modal"
) as HTMLDivElement;
const $formCategory = document.querySelector("#category") as HTMLSelectElement;
const $formDistance = document.querySelector("#distance") as HTMLSelectElement;
const $restaurantForm = document.querySelector(
  "#restaurant-form"
) as HTMLFormElement;

// 로딩시 음식점 리스트 가져오는 이벤트
window.addEventListener("load", () => {
  // 카테고리 필터링 기준 불러오기
  const categoryFragment = new DocumentFragment();
  categories.forEach((category) => {
    const categoryTag = document.createElement("option");
    categoryTag.value = category;
    categoryTag.textContent = category;
    categoryFragment.append(categoryTag);
  });
  $categoryFilter.appendChild(categoryFragment);

  const formCategoryFragment = new DocumentFragment();
  categories.forEach((category) => {
    const categoryTag = document.createElement("option");
    categoryTag.value = category;
    categoryTag.textContent = category;
    formCategoryFragment.append(categoryTag);
  });
  $formCategory.appendChild(formCategoryFragment);

  // 정렬 기준 불러오기
  const sortingFragment = new DocumentFragment();
  sortingStandards.forEach((sortingStandard) => {
    const sortingStandardTag = document.createElement("option");
    sortingStandardTag.value = sortingStandard;
    sortingStandardTag.textContent = sortingStandardsMapper[sortingStandard];
    sortingFragment.append(sortingStandardTag);
  });
  $sortingFilter.appendChild(sortingFragment);

  const restaurantFragment = new DocumentFragment();
  restaurantList
    .getRestaurants({
      category: $categoryFilter.value as Category | "전체",
      sortingStandard: $sortingFilter.value as SortingStandard,
    })
    .forEach((restaurant) => {
      const restauantTag = document.createElement("li");
      restauantTag.className = "restaurant";
      restauantTag.innerHTML = /*html*/ `
        <div class="restaurant__category">
          <img
            src="${categoryToIconNameMapper[restaurant.category]}"
            alt="${restaurant.category}"
            class="category-icon"
          />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body"
            >캠퍼스부터 ${distancesMapper[restaurant.distance]}</span
          >
          <p class="restaurant__description text-body">
            ${restaurant.description || ""}
          </p>
        </div>
      `;
      restaurantFragment.append(restauantTag);
    });
  $restaurantList.appendChild(restaurantFragment);

  const distanceFragment = new DocumentFragment();
  distances.forEach((distance) => {
    const distanceTag = document.createElement("option");
    distanceTag.value = distance.toString();
    distanceTag.textContent = distancesMapper[distance];
    distanceFragment.append(distanceTag);
  });
  $formDistance.appendChild(distanceFragment);
});

// 카테고리 필터링 기준 선택시 리스트 가져오는 이벤트
$categoryFilter.addEventListener("change", () => {
  const restaurantFragment = new DocumentFragment();
  restaurantList
    .getRestaurants({
      category: $categoryFilter.value as Category | "전체",
      sortingStandard: $sortingFilter.value as SortingStandard,
    })
    .forEach((restaurant) => {
      const restauantTag = document.createElement("li");
      restauantTag.className = "restaurant";
      restauantTag.innerHTML = /*html*/ `
        <div class="restaurant__category">
          <img
            src="${categoryToIconNameMapper[restaurant.category]}"
            alt="${restaurant.category}"
            class="category-icon"
          />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body"
            >캠퍼스부터 ${distancesMapper[restaurant.distance]}</span
          >
          <p class="restaurant__description text-body">
            ${restaurant.description || ""}
          </p>
        </div>
      `;
      restaurantFragment.append(restauantTag);
    });
  $restaurantList.replaceChildren(restaurantFragment);
});

// 정렬 기준 선택시 리스트 가져오는 이벤트
$sortingFilter.addEventListener("change", () => {
  const restaurantFragment = new DocumentFragment();
  restaurantList
    .getRestaurants({
      category: $categoryFilter.value as Category | "전체",
      sortingStandard: $sortingFilter.value as SortingStandard,
    })
    .forEach((restaurant) => {
      const restauantTag = document.createElement("li");
      restauantTag.className = "restaurant";
      restauantTag.innerHTML = /*html*/ `
        <div class="restaurant__category">
          <img
            src="${categoryToIconNameMapper[restaurant.category]}"
            alt="${restaurant.category}"
            class="category-icon"
          />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body"
            >캠퍼스부터 ${distancesMapper[restaurant.distance]}</span
          >
          <p class="restaurant__description text-body">
            ${restaurant.description || ""}
          </p>
        </div>
      `;
      restaurantFragment.append(restauantTag);
    });
  $restaurantList.replaceChildren(restaurantFragment);
});

// 음식점 추가 버튼 클릭 이벤트
$addRestaurantButton.addEventListener("click", () => {
  $addRestaurantFormModal.classList.add("modal--open");
});

// 모달 form 제출
$restaurantForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);

  const newRestuarant: Restaurant = {
    category: formData.get("category") as Category,
    name: formData.get("name") as string,
    distance: Number(formData.get("distance")) as Distance,
    description: formData.get("description") as string,
    link: formData.get("link") as Link,
  };

  $addRestaurantFormModal.classList.remove("modal--open");
  restaurantList.add(newRestuarant);

  const restaurantFragment = new DocumentFragment();
  restaurantList
    .getRestaurants({
      category: $categoryFilter.value as Category | "전체",
      sortingStandard: $sortingFilter.value as SortingStandard,
    })
    .forEach((restaurant) => {
      const restauantTag = document.createElement("li");
      restauantTag.className = "restaurant";
      restauantTag.innerHTML = /*html*/ `
        <div class="restaurant__category">
          <img
            src="${categoryToIconNameMapper[restaurant.category]}"
            alt="${restaurant.category}"
            class="category-icon"
          />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
          <span class="restaurant__distance text-body"
            >캠퍼스부터 ${distancesMapper[restaurant.distance]}</span
          >
          <p class="restaurant__description text-body">
            ${restaurant.description || ""}
          </p>
        </div>
      `;
      restaurantFragment.append(restauantTag);
    });
  $restaurantList.replaceChildren(restaurantFragment);
});

// 모달 form 취소
$addRestaurantCancelButton.addEventListener("click", () => {
  $addRestaurantFormModal.classList.remove("modal--open");
});
