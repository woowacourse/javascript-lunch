import {
  CATEGORY_WITH_ENTIRE,
  SORT_STANDARD,
} from "../constants/selectOptions";

import AddRestaurantForm from "../view/components/AddRestaurantForm/AddRestaurantForm";
import FORM_ITEM_TEXTS from "../constants/formItemTexts";
import Modal from "../view/components/Modal/Modal";
import RestaurantItem from "../view/components/RestaurantItem/RestaurantItem";
import RestaurantList from "../domain/RestaurantList";
import SelectBox from "../view/components/SelectBox/SelectBox";
import createElementByTag from "../view/utils/createElementByTag";
import getLocalStorageItem from "../utils/getLocalStorageItem";
import { restaurantData } from "../data/restaurantData";

class MainController {
  #filters = {
    category: new SelectBox({
      options: CATEGORY_WITH_ENTIRE,
      eventListenerArgs: [["change", this.#renderRestaurantListUl.bind(this)]],
    }),
    sortStandard: new SelectBox({
      options: SORT_STANDARD,
      eventListenerArgs: [["change", this.#renderRestaurantListUl.bind(this)]],
    }),
  };

  #restaurantListUl = document.getElementById("restaurant-list-ul");

  #modal = this.#createModal();

  #restaurantList = new RestaurantList();

  start() {
    this.#setRestaurantList();
    this.#renderFilterContainer();
    this.#renderRestaurantListUl();
    document.getElementById("main")?.append(this.#modal.element);
    const openButton = document.getElementById("add-restaurant-button");

    openButton?.addEventListener("click", () => {
      this.#modal.open();
    });
  }

  #createModal() {
    const modal = new Modal({
      eventListenerArgs: [
        [
          "submit",
          (e) => {
            e.preventDefault();
            this.#renderRestaurantListUl.bind(this)();
            modal.close();
          },
        ],
      ],
    });

    const submitFunc = (restaurant: Restaurant) => {
      this.#restaurantList.add(restaurant);
      this.#setLocalStorage(this.#restaurantList.getRestaurants());
    };

    const addRestaurantForm = new AddRestaurantForm({
      cancelFunc: modal.close.bind(modal),
      submitFunc: submitFunc.bind(this),
    });

    const title = createElementByTag({
      tag: "h2",
      classes: ["modal-title", "text-title"],
      contents: FORM_ITEM_TEXTS.formTitle,
    });

    modal.replaceContents([title, addRestaurantForm.element]);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") modal.close();
    });

    return modal;
  }

  #setRestaurantList() {
    const restaurants = getLocalStorageItem("restaurants", restaurantData);
    this.#restaurantList.init(restaurants ?? []);
  }

  #renderFilterContainer() {
    const filterContainer = document.getElementById("filter-container");
    filterContainer?.append(
      this.#filters.category.element,
      this.#filters.sortStandard.element
    );
  }

  #renderRestaurantListUl() {
    const filteredRestaurantItem = this.#getFilteredRestaurantItem();
    const restaurantItemElements = filteredRestaurantItem.map((restaurant) => {
      return new RestaurantItem({ restaurant }).element;
    });

    this.#restaurantListUl?.replaceChildren(...restaurantItemElements);
  }

  #getFilteredRestaurantItem() {
    const filterSelection = this.#getFilterSelection();
    const restaurantItems =
      this.#restaurantList.getOrderedRestaurant(filterSelection);
    return restaurantItems;
  }

  #getFilterSelection() {
    return {
      category: this.#filters.category.getValue() as CategoryWithEntire,
      sortStandard: this.#filters.sortStandard.getValue() as SortStandard,
    };
  }

  #setLocalStorage(item: Restaurant[]) {
    const stringifiedRestaurants = JSON.stringify(item);
    localStorage.setItem("restaurants", stringifiedRestaurants);
  }
}

export default MainController;
