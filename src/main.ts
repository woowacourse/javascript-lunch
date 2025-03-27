import createHeader from "./components/Header.ts";
import createTab from "./components/Tab.ts";
import renderRestaurantList from "./components/RestaurantList.ts";
import createRestaurantItem from "./components/RestaurantItem.ts";
import Modal from "./components/Modal.ts";
import { createForm } from "./components/Form.ts";
import validateRestaurant from "./validateRestaurant.js";
import {
  Category,
  Distance,
  Restaurant,
  SortType,
} from "./types/restaurant.ts";
import { restaurantManager } from "./restaurantManager.ts";

type State = {
  tab: "모든 음식점" | "자주 가는 음식점";
  category: Category;
  sortType: SortType;
  restaurants: Restaurant[];
};

const state: State = {
  tab: "모든 음식점",
  category: "전체",
  sortType: "name",
  restaurants: [],
};

const setStateRestaurant = (restaurants: Restaurant[]) => {
  state.restaurants = restaurants;
};

document.addEventListener("DOMContentLoaded", () => {
  state.restaurants = restaurantManager.getInitialData();

  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });

  const categoryFilter = body?.querySelector("#category-filter");
  const sortingFilter = body?.querySelector("#sorting-filter");
  const restaurantList = document.querySelector(".restaurant-list");

  categoryFilter?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    const value = target.value as Category;

    state.category = value;

    if (!restaurantList) {
      throw new Error("음식점 목록을 찾을 수 없습니다.");
    }

    const filterRestaurants = restaurantManager.getFilterAndSortList(
      state.restaurants,
      value,
      state.sortType
    );

    renderRestaurantList(filterRestaurants, setStateRestaurant, restaurantList);
  });

  sortingFilter?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    const value = target.value as SortType;

    if (!restaurantList) {
      throw new Error("음식점 목록을 찾을 수 없습니다.");
    }

    state.sortType = value;

    const filterRestaurants = restaurantManager.getFilterAndSortList(
      state.restaurants,
      state.category,
      value
    );

    renderRestaurantList(filterRestaurants, setStateRestaurant, restaurantList);
  });

  const tab = createTab({
    title: "모든 음식점",
    subTitle: "자주 가는 음식점",
  });

  header?.after(tab);

  const mainTab = tab.querySelector(".tab__title");
  const subTab = tab.querySelector(".tab__subTitle");
  const restaurantFilterContainer = document.querySelector(
    ".restaurant-filter-container"
  );

  mainTab?.classList.add("active");

  mainTab?.addEventListener("click", () => {
    mainTab.classList.add("active");
    subTab?.classList.remove("active");

    if (!restaurantList) {
      throw new Error("음식점 목록을 찾을 수 없습니다.");
    }

    renderRestaurantList(state.restaurants, setStateRestaurant, restaurantList);

    restaurantFilterContainer?.classList.remove("hidden");
  });

  subTab?.addEventListener("click", () => {
    subTab.classList.add("active");
    mainTab?.classList.remove("active");
    const restaurants: Restaurant[] = restaurantManager.getFavoriteList(
      state.restaurants
    );

    if (!restaurantList) {
      throw new Error("음식점 목록을 찾을 수 없습니다.");
    }

    renderRestaurantList(restaurants, setStateRestaurant, restaurantList);

    restaurantFilterContainer?.classList.add("hidden");
  });

  const handleFormSubmit = () => {
    const addRestaurantDialogElement = document.getElementById(
      "restaurant-add-dialog"
    );

    if (!addRestaurantDialogElement) {
      throw new Error("다이얼로그 요소를 찾을 수 없습니다.");
    }

    const nameInput =
      addRestaurantDialogElement.querySelector<HTMLInputElement>("#name");
    const descriptionInput =
      addRestaurantDialogElement.querySelector<HTMLTextAreaElement>(
        "#description"
      );
    const categoryInput =
      addRestaurantDialogElement.querySelector<HTMLSelectElement>("#category");
    const distanceInput =
      addRestaurantDialogElement.querySelector<HTMLSelectElement>("#distance");
    const linkInput =
      addRestaurantDialogElement.querySelector<HTMLInputElement>("#link");

    const restaurantsNameList = state.restaurants.map(
      (restaurant: Restaurant) => restaurant.name
    );

    if (
      !nameInput ||
      !descriptionInput ||
      !categoryInput ||
      !distanceInput ||
      !linkInput
    ) {
      throw new Error("필요한 입력 요소 중 하나 이상을 찾을 수 없습니다.");
    }

    const newRestaurant = {
      id: restaurantManager.getUniqueId(),
      category: categoryInput.value as Category,
      name: nameInput.value,
      distance: Number(distanceInput.value) as Distance,
      description: descriptionInput.value,
      link: linkInput.value,
      isFavorite: false,
    };

    const errorMessage = validateRestaurant(newRestaurant, restaurantsNameList);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const restaurantItem = createRestaurantItem(newRestaurant);
    restaurantList?.appendChild(restaurantItem);

    restaurantManager.add(newRestaurant);

    formReset();
  };

  const formContent = createForm();
  const formReset = () => {
    const addRestaurantForm = document.querySelector<HTMLFormElement>(
      "#restaurant-add-dialog form"
    );
    addRestaurantForm?.reset();
  };

  const addRestaurantModal = Modal({
    id: "restaurant-add-dialog",
    title: "새로운 음식점",
    content: formContent,
    options: {
      close: {
        label: "취소하기",
        onClick: () => {
          formReset();
        },
      },
      submit: {
        label: "추가하기",
        onClick: handleFormSubmit,
      },
    },
  });

  body?.append(addRestaurantModal);

  const addRestaurantModalButton = header?.querySelector(".gnb__button");
  addRestaurantModalButton?.addEventListener("click", () => {
    addRestaurantModal.showModal();
  });

  if (restaurantList) {
    renderRestaurantList(state.restaurants, setStateRestaurant, restaurantList);
  }
});
