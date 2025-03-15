import image from "../public/icons/favorite-icon-filled.png";
import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import { restaurants } from "./database/restaurants.js";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import Modal from "./components/modal/Modal.js";
import Component from "./components/core/Component.js";
import { $ } from "./utils/selector.js";
import RestaurantItem from "./components/RestaurantItem.js";

import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "./database/localStorage.js";
import RestaurantInfoModal from "./components/modal/RestaurantInfoModal/index.js";
import { makeUniqueId } from "./utils/makeUniqueId.js";
import CategoryFilter from "./components/CategoryFilter.js";
import SortingFilter from "./components/SortingFilter.js";
import sortAndFilter from "./utils/sortAndFilter.js";

import emptyStar from "../public/icons/emptyStar.svg";
import filledStar from "../public/icons/filledStar.svg";

class App extends Component {
  setup() {
    this.state = {
      restaurants: sortAndFilter(
        this.props.getItemFromLocalStorage(this.props.KEY)
      ),
    };
  }

  updateRestaurant(newRestaurant) {
    const newRestaurantList = [newRestaurant, ...this.state.restaurants];
    this.props.setItemToLocalStorage(this.props.KEY, newRestaurantList);

    this.setState({
      restaurants: newRestaurantList,
    });

    const $categoryFilter = $(document, "#category-filter");
    if ($categoryFilter.value !== newRestaurant.category) {
      return;
    }

    this.updateNewRestaurant(newRestaurant);
  }

  updateNewRestaurant(newRestaurant) {
    const $restaurantList = $(document, ".restaurant-list");

    $restaurantList.insertAdjacentHTML(
      "afterbegin",
      RestaurantItem(newRestaurant)
    );
  }

  deleteRestaurant(targetRestaurant) {
    const newRestaurantList = [...this.state.restaurants].filter(
      ({ id }) => id !== targetRestaurant.id
    );
    this.props.setItemToLocalStorage(this.props.KEY, newRestaurantList);

    this.setState({
      restaurants: newRestaurantList,
    });

    this.renderDeleteRestaurant(targetRestaurant);
  }

  renderDeleteRestaurant(targetRestaurant) {
    const { id } = targetRestaurant;
    const $targetRestaurant = $(document, `#${id}`);
    $targetRestaurant.remove();
  }

  template() {
    return /*html*/ `
        <main>
          <section class="restaurant-filter-container"></section>
        </main>
        <div id="modal"></div>
    `;
  }

  componentDidUpdate() {}

  componentDidMount() {
    const $modal = new AddRestaurantModal($(document, "#modal"), {
      updateRestaurant: this.updateRestaurant.bind(this),
    });

    const openModal = () => {
      if (!$modal) {
        return;
      }
      $modal.open();
    };

    const $header = new Header($(document, "#app"), {
      data: {
        title: "점심 뭐 먹지",
        ariaLabel: "음식점 추가",
        dataTestId: "open-add-restaurant-modal-button",
        iconImageSource: "./icons/add-button.png",
        alt: "음식점 추가",
      },
      buttonCallback: openModal,
    });

    this.renderRestaurantList(this.state.restaurants);

    const $restaurantFilterContainer = $(
      document,
      ".restaurant-filter-container"
    );
    $restaurantFilterContainer.insertAdjacentHTML(
      "afterbegin",
      CategoryFilter()
    );

    const $categoryFilter = $($restaurantFilterContainer, "#category-filter");

    $categoryFilter.addEventListener("change", (event) => {
      const restaurantSection = $(document, ".restaurant-list-container");
      restaurantSection.remove();

      const restaurantList = this.state.restaurants;

      const category = event.target.value;

      const $sortingFilter = $($restaurantFilterContainer, "#sorting-filter");
      const sorting = $sortingFilter.value;

      this.renderRestaurantList(
        sortAndFilter(restaurantList, sorting, category)
      );
    });

    $restaurantFilterContainer.insertAdjacentHTML("beforeend", SortingFilter());
    const $sortingFilter = $($restaurantFilterContainer, "#sorting-filter");

    $sortingFilter.addEventListener("change", (event) => {
      const restaurantSection = $(document, ".restaurant-list-container");
      restaurantSection.remove();

      const restaurantList = this.state.restaurants;

      const $categoryFilter = $($restaurantFilterContainer, "#category-filter");
      const category = $categoryFilter.value;

      const sorting = event.target.value;

      this.renderRestaurantList(
        sortAndFilter(restaurantList, sorting, category)
      );
    });
  }

  renderRestaurantList(restaurants) {
    const $main = $(document, "main");
    $main.insertAdjacentHTML("beforeend", RestaurantList(restaurants));

    $(document, "#restaurant-list").addEventListener("click", (event) => {
      const restaurantItem = event.target.closest("li");
      const restaurantList = this.props.getItemFromLocalStorage(this.props.KEY);

      const restaurant = restaurantList.find(
        ({ id }) => id === restaurantItem.id
      );

      const $button = event.target.closest("button");
      if ($button && $button.dataset.buttonid === restaurantItem.id) {
        const newRestaurant = {
          ...restaurant,
          isFavorite: !restaurant.isFavorite,
        };
        const newRestaurantList = [
          ...restaurantList.filter(({ id }) => id !== restaurantItem.id),
          newRestaurant,
        ];

        this.props.setItemToLocalStorage(this.props.KEY, newRestaurantList);
        this.setState({
          restaurants: newRestaurantList,
        });

        const $img = $($button, ".favorite-icon");
        $img.setAttribute(
          "src",
          newRestaurant.isFavorite ? filledStar : emptyStar
        );
        return;
      }

      const changeLocalStorageState = (restaurant) => {
        const restaurantList = this.props.getItemFromLocalStorage(
          this.props.KEY
        );

        const newRestaurant = {
          ...restaurant,
          isFavorite: !restaurant.isFavorite,
        };

        const newRestaurantList = [
          ...restaurantList.filter(({ id }) => id !== restaurant.id),
          newRestaurant,
        ];

        this.props.setItemToLocalStorage(this.props.KEY, newRestaurantList);
        this.setState({
          restaurants: newRestaurantList,
        });

        const $img = $(
          $(document, "#restaurant-info-container"),
          ".favorite-icon"
        );
        $img.setAttribute(
          "src",
          newRestaurant.isFavorite ? filledStar : emptyStar
        );
      };

      const restaurantInfoModal = new RestaurantInfoModal(
        $(document, "#modal"),
        {
          data: restaurant,
          deleteRestaurant: this.deleteRestaurant.bind(this),
          changeLocalStorageState,
        }
      );
      restaurantInfoModal.open();
    });
  }
}

const KEY = "restaurantList";

const initializeRestaurantList = (restaurants) => {
  return restaurants.map((restaurant) => ({
    ...restaurant,
    id: makeUniqueId(restaurant.name), // id 추가
    isFavorite: false,
  }));
};

const initialList = initializeRestaurantList(restaurants);
const restaurantList = getItemFromLocalStorage(KEY) ?? initialList;

setItemToLocalStorage(KEY, restaurantList);

const app = $(document, "#app");
new App(app, { setItemToLocalStorage, getItemFromLocalStorage, KEY });
