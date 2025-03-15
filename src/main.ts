import $header from "./components/layout/header.ts";
import $inputItem from "./components/form-elements/input-item.ts";
import $addRestaurantModal from "./components/modal/add-restaurant-modal.ts";
import $button from "./components/common/button.ts";
import $buttonContainer from "./components/layout/button-container.ts";
import $filter from "./components/common/filter.ts";
import $restaurantDetailModal from "./components/modal/restaurant-detail-modal.ts";
import $tabbar from "./components/common/tabBar.ts";
import { handleModalClose } from "./components/modal/add-restaurant-modal.ts";
import { handleAddRestaurant } from "./components/form-elements/form.ts";
import { handleRestaurantDetailModalClose } from "./components/modal/restaurant-detail-modal.ts";
import { handleRestaurantDetailModalOpen } from "./components/modal/restaurant-detail-modal.ts";
import { UI_CONFIG } from "./constants/uiConfig.ts";
import { currentRestaurantData } from "./data/restaurant.ts";
import { FORM_FIELDS } from "./constants/formFields.ts";
import { FILTERS } from "./constants/filters.ts";
import { filterRestaurants, sortRestaurants } from "./utils/filterUtils.ts";
import { renderRestaurants } from "./utils/renderUtils.ts";
import { saveRestaurantsToLocalStorage } from "./data/restaurant.ts";
import { FavoriteImageElement } from "./components/common/favorite-button.ts";

addEventListener("load", () => {
  document.body.prepend($header(UI_CONFIG.HEADER));
  const main = document.querySelector("main");
  if (!main) return;
  const tabbar = $tabbar();
  main.prepend(tabbar);

  let selectedTab = document.querySelector(
    'input[name="tab"]:checked'
  ) as HTMLInputElement;

  const updateRestaurantFilter = () => {
    const restaurantFilter = document.querySelector(
      ".restaurant-filter-container"
    );
    if (!restaurantFilter) return;

    if (selectedTab.value === "all") {
      restaurantFilter.classList.remove("hidden");
      restaurantFilter.innerHTML = "";
      const listFilters = [$filter(FILTERS.CATEGORY), $filter(FILTERS.SORT)];
      listFilters.forEach((data) => {
        restaurantFilter.appendChild(data);
      });
    } else if (selectedTab.value === "frequent") {
      restaurantFilter.classList.add("hidden");
    }

    const newCategoryFilter = document.querySelector("#category-filter");
    const newSortingFilter = document.querySelector("#sorting-filter");

    if (newCategoryFilter) {
      newCategoryFilter.addEventListener("change", (e) => {
        selectedCategory = (e.target as HTMLSelectElement)?.value || "";
        updateList();
      });
    }

    if (newSortingFilter) {
      newSortingFilter.addEventListener("change", (e) => {
        selectedSorting =
          (e.target as HTMLSelectElement)?.value || selectedSorting;
        updateList();
      });
    }
  };

  updateRestaurantFilter();

  const categoryFilter = document.querySelector("#category-filter");
  const sortingFilter = document.querySelector("#sorting-filter");
  const restaurantList = document.querySelector(
    ".restaurant-list"
  ) as HTMLElement | null;

  if (!categoryFilter || !sortingFilter || !restaurantList) return;

  let selectedCategory = "";
  let selectedSorting = "name";

  tabbar.addEventListener("change", () => {
    selectedTab = document.querySelector(
      'input[name="tab"]:checked'
    ) as HTMLInputElement;
    updateRestaurantFilter();
    selectedCategory = "";
    selectedSorting = "name";
    updateList();
  });

  const bindFavoriteEvents = () => {
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
        if (selectedTab.value === "frequent") updateList();

        saveRestaurantsToLocalStorage(currentRestaurantData);
      });
    });
  };

  const updateList = () => {
    let filteredRestaurants: typeof currentRestaurantData = [];

    if (selectedTab.value === "all") {
      filteredRestaurants = filterRestaurants(
        currentRestaurantData,
        selectedCategory
      );
    } else if (selectedTab.value === "frequent") {
      filteredRestaurants = currentRestaurantData.filter(
        (restaurant) => restaurant.isFavorite
      );
    }

    const sorted = sortRestaurants(filteredRestaurants, selectedSorting);
    renderRestaurants(restaurantList, sorted);
    saveRestaurantsToLocalStorage(currentRestaurantData);

    bindFavoriteEvents();
  };

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

  updateList();

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

  const cancelButton = document.querySelector("#cancel-restaurant-add-button");
  if (cancelButton) cancelButton.addEventListener("click", handleModalClose);

  const addButton = document.querySelector("#restaurant-add-button");
  if (addButton) addButton.addEventListener("click", handleAddRestaurant);
});

// 음식점 상세 정보 버튼 이벤트 처리
document.body.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.matches("#delete-restaurant-button")) {
    handleRestaurantDetailModalClose();
  }

  if (target.matches("#close-restaurant-detail-button")) {
    handleRestaurantDetailModalClose();
  }
});
