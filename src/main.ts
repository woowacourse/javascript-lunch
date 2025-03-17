import $header from "./components/layout/header.ts";
import $inputItem from "./components/form-elements/input-item.ts";
import $addRestaurantModal from "./components/modal/add-restaurant-modal.ts";
import $button from "./components/common/button.ts";
import $buttonContainer from "./components/layout/button-container.ts";
import $filter from "./components/common/filter.ts";
import $tabbar from "./components/common/tabbar.ts";
import $restaurantDetailModal, {
  handleDeleteRestaurant,
} from "./components/modal/restaurant-detail-modal.ts";
import { handleModalClose } from "./components/modal/add-restaurant-modal.ts";
import { handleAddRestaurant } from "./components/form-elements/form.ts";
import { handleRestaurantDetailModalClose } from "./components/modal/restaurant-detail-modal.ts";
import { handleRestaurantDetailModalOpen } from "./components/modal/restaurant-detail-modal.ts";
import { UI_CONFIG } from "./constants/uiConfig.ts";
import {
  currentRestaurantData,
  saveRestaurantsToLocalStorage,
} from "./data/storage/restaurantStorage.ts";
import { FORM_FIELDS } from "./constants/formFields.ts";
import { FILTERS } from "./constants/filters.ts";
import { filterRestaurants, sortRestaurants } from "./restaurantUtils/filterUtils.ts";
import { renderRestaurants } from "./restaurantUtils/renderUtils.ts";
import { FavoriteImageElement } from "./components/common/favorite-button.ts";

const initUI = (): { main: HTMLElement; tabbar: HTMLElement } => {
  document.body.prepend($header(UI_CONFIG.HEADER));
  const main = document.querySelector("main");
  if (!main) throw new Error("Main element not found");
  const tabbar = $tabbar();
  main.prepend(tabbar);
  return { main, tabbar };
};

type FilterState = {
  selectedCategory: "" | "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
  selectedSorting: "name" | "distance";
};

type AppState = {
  selectedTab: HTMLInputElement;
  filterState: FilterState;
};

const updateRestaurantFilter = (state: AppState): void => {
  const restaurantFilter = document.querySelector(
    ".restaurant-filter-container"
  );
  if (!restaurantFilter) return;

  if (state.selectedTab.value === "all") {
    restaurantFilter.classList.remove("hidden");
    restaurantFilter.innerHTML = "";
    const listFilters = [$filter(FILTERS.CATEGORY), $filter(FILTERS.SORT)];
    listFilters.forEach((filterElem) =>
      restaurantFilter.appendChild(filterElem)
    );
  } else if (state.selectedTab.value === "frequent") {
    restaurantFilter.classList.add("hidden");
  }

  // 필터 요소에 이벤트 등록
  const newCategoryFilter = document.querySelector(
    "#category-filter"
  ) as HTMLSelectElement | null;
  const newSortingFilter = document.querySelector(
    "#sorting-filter"
  ) as HTMLSelectElement | null;

  if (newCategoryFilter) {
    newCategoryFilter.addEventListener("change", (e) => {
      const value = (e.target as HTMLSelectElement).value;
      if (
        value === "" ||
        value === "한식" ||
        value === "중식" ||
        value === "일식" ||
        value === "양식" ||
        value === "아시안" ||
        value === "기타"
      ) {
        state.filterState.selectedCategory = value;
      }
      updateList(state);
    });
  }

  if (newSortingFilter) {
    newSortingFilter.addEventListener("change", (e) => {
      const value = (e.target as HTMLSelectElement).value;
      if (value === "name" || value === "distance") {
        state.filterState.selectedSorting = value;
      }
      updateList(state);
    });
  }
};

const bindFavoriteEvents = (state: AppState): void => {
  const favButtons = document.querySelectorAll(
    ".button-favorite"
  ) as NodeListOf<FavoriteImageElement>;
  favButtons.forEach((favButton) => {
    const restaurantId = favButton.getAttribute("data-restaurant-id");
    if (!restaurantId) return;

    const restaurant = currentRestaurantData.find(
      (r) => r.dataId.toString() === restaurantId
    );
    if (!restaurant) return;

    favButton.addEventListener("mouseover", () => {
      if (!restaurant.isFavorite) favButton.src = "images/star-filled.png";
    });

    favButton.addEventListener("mouseout", () => {
      if (!restaurant.isFavorite) favButton.src = "images/star-outline.png";
    });

    favButton.addEventListener("click", (e) => {
      e.stopPropagation();
      restaurant.isFavorite = !restaurant.isFavorite;
      favButton.src = restaurant.isFavorite
        ? "images/star-filled.png"
        : "images/star-outline.png";
      if (state.selectedTab.value === "frequent") updateList(state);
      saveRestaurantsToLocalStorage(currentRestaurantData);
    });
  });
};

const updateList = (state: AppState): void => {
  const restaurantList = document.querySelector(
    ".restaurant-list"
  ) as HTMLElement | null;
  if (!restaurantList) return;

  let filteredRestaurants = [] as typeof currentRestaurantData;
  if (state.selectedTab.value === "all") {
    filteredRestaurants = filterRestaurants(
      currentRestaurantData,
      state.filterState.selectedCategory
    );
  } else if (state.selectedTab.value === "frequent") {
    filteredRestaurants = currentRestaurantData.filter(
      (restaurant) => restaurant.isFavorite
    );
  }

  const sorted = sortRestaurants(
    filteredRestaurants,
    state.filterState.selectedSorting
  );
  renderRestaurants(restaurantList, sorted);
  saveRestaurantsToLocalStorage(currentRestaurantData);
  bindFavoriteEvents(state);
};

const setupTabChangeListener = (state: AppState, tabbar: HTMLElement): void => {
  tabbar.addEventListener("change", () => {
    state.selectedTab = document.querySelector(
      'input[name="tab"]:checked'
    ) as HTMLInputElement;
    updateRestaurantFilter(state);
    // 탭 전환 시 필터 상태 초기화
    state.filterState.selectedCategory = "";
    state.filterState.selectedSorting = "name";
    updateList(state);
  });
};

const setupRestaurantClickListener = (main: HTMLElement): void => {
  const restaurantList = document.querySelector(
    ".restaurant-list"
  ) as HTMLElement | null;
  if (!restaurantList) return;
  restaurantList.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement).closest(".restaurant");
    if (!target) return;

    const restaurantId = target.getAttribute("data-id");
    if (!restaurantId) return;

    const restaurant = currentRestaurantData.find(
      (r) => r.dataId.toString() === restaurantId
    );
    if (!restaurant) return;

    const modal = $restaurantDetailModal(restaurant);
    main.appendChild(modal);
    handleRestaurantDetailModalOpen();
  });
};

const setupRestaurantAddForm = (main: HTMLElement): void => {
  const submitCancelButtons = $buttonContainer({
    buttons: [
      $button(UI_CONFIG.BUTTONS.CANCEL),
      $button(UI_CONFIG.BUTTONS.ADD),
    ],
  });
  const restaurantAddForm = [
    $inputItem(FORM_FIELDS.SELECTS, "category"),
    $inputItem(FORM_FIELDS.INPUTS, "name"),
    $inputItem(FORM_FIELDS.SELECTS, "distance"),
    $inputItem(FORM_FIELDS.TEXTAREAS, "description"),
    $inputItem(FORM_FIELDS.INPUTS, "link"),
    submitCancelButtons,
  ];
  main.appendChild($addRestaurantModal({ form: restaurantAddForm }));
};

addEventListener("load", () => {
  const { main, tabbar } = initUI();
  const initialTab = document.querySelector(
    'input[name="tab"]:checked'
  ) as HTMLInputElement;
  const state: AppState = {
    selectedTab: initialTab,
    filterState: {
      selectedCategory: "",
      selectedSorting: "name",
    },
  };

  updateRestaurantFilter(state);
  setupTabChangeListener(state, tabbar);
  setupRestaurantClickListener(main);
  setupRestaurantAddForm(main);
  updateList(state);
});

// 전역 이벤트: 모달 내 버튼 처리
document.body.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.matches("#delete-restaurant-button")) {
    handleDeleteRestaurant(Number(target.getAttribute("data-restaurant-id")));
  }
  if (target.matches("#close-restaurant-detail-button")) {
    handleRestaurantDetailModalClose();
  }
  if (target.matches("#cancel-restaurant-add-button")) {
    handleModalClose();
  }
  if (target.matches("#restaurant-add-button")) {
    handleAddRestaurant(e);
  }
});
