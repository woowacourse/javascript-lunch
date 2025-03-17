import Component from "./components/core/Component.js";
import Header from "./components/Header.js";
import TabNavigation from "./components/TabNavigation.js";
import Modal from "./components/common/Modal.js";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import RestaurantInfoModal from "./components/modal/RestaurantInfoModal/index.js";
import RestaurantList from "./components/RestaurantList.js";
import RestaurantItem from "./components/RestaurantItem.js";
import CategoryFilter from "./components/CategoryFilter.js";
import SortingFilter from "./components/SortingFilter.js";

import { $ } from "./utils/selector.js";

import lunchRestaurantsService from "./domain/lunchRestaurantsService.js";

import emptyStar from "../public/icons/favorite-icon-lined.png";
import filledStar from "../public/icons/favorite-icon-filled.png";

class App extends Component {
  setup() {
    this.state = {
      restaurants: this.props.lunchDomain.getRestaurants(),
      activeTab: "all",
    };
    this.props.lunchDomain.saveRestaurants(this.state.restaurants);
  }

  updateRestaurant(newRestaurant) {
    const { newRestaurantList, newRestaurantWithId } =
      this.props.lunchDomain.addRestaurant(
        this.state.restaurants,
        newRestaurant
      );
    this.setState({ restaurants: newRestaurantList });

    this.updateNewRestaurant(newRestaurantWithId);
  }

  updateNewRestaurant(newRestaurant) {
    const $categoryFilter = $(document, "#category-filter");
    if (
      $categoryFilter.value !== "전체" &&
      $categoryFilter.value !== newRestaurant.category
    ) {
      return;
    }

    const $restaurantList = $(document, ".restaurant-list");
    $restaurantList.insertAdjacentHTML(
      "afterbegin",
      RestaurantItem(newRestaurant)
    );
  }

  deleteRestaurant(targetRestaurant) {
    const updatedList = this.props.lunchDomain.deleteRestaurant(
      this.state.restaurants,
      targetRestaurant
    );
    this.setState({ restaurants: updatedList });

    this.renderDeleteRestaurant(targetRestaurant);
  }

  renderDeleteRestaurant(targetRestaurant) {
    const { id } = targetRestaurant;
    const $targetRestaurant = $(document, `#${id}`);
    $targetRestaurant.remove();
  }

  handleTabChange(tab) {
    this.setState({ activeTab: tab });
    this.renderContent();
  }

  template() {
    return /*html*/ `
        <main>
          <section class="restaurant-filter-container"></section>
          <div class="restaurant-list-container"></div>
        </main>
        <div id="modal"></div>
    `;
  }

  componentDidUpdate() {}

  renderFilterAndSort($restaurantFilterContainer) {
    this.renderCategoryFilter($restaurantFilterContainer);
    this.renderSortingFilter($restaurantFilterContainer);
  }

  renderCategoryFilter($restaurantFilterContainer) {
    $restaurantFilterContainer.insertAdjacentHTML(
      "beforeend",
      CategoryFilter()
    );

    const $categoryFilter = $($restaurantFilterContainer, "#category-filter");

    $categoryFilter.addEventListener("change", (event) => {
      const restaurantSection = $(document, ".restaurant-list-container");
      restaurantSection.remove();

      const category = event.target.value;
      const $sortingFilter = $($restaurantFilterContainer, "#sorting-filter");
      const sorting = $sortingFilter.value;

      this.renderRestaurantList(
        this.props.lunchDomain.filterAndSortRestaurants(
          this.state.restaurants,
          sorting,
          category
        )
      );
    });
  }

  renderSortingFilter($restaurantFilterContainer) {
    $restaurantFilterContainer.insertAdjacentHTML("beforeend", SortingFilter());
    const $sortingFilter = $($restaurantFilterContainer, "#sorting-filter");

    $sortingFilter.addEventListener("change", (event) => {
      const restaurantSection = $(document, ".restaurant-list-container");
      restaurantSection.remove();

      const $categoryFilter = $($restaurantFilterContainer, "#category-filter");
      const category = $categoryFilter.value;
      const sorting = event.target.value;

      this.renderRestaurantList(
        this.props.lunchDomain.filterAndSortRestaurants(
          this.state.restaurants,
          sorting,
          category
        )
      );
    });
  }

  renderRestaurantList(restaurants) {
    const $main = $(document, "main");
    $main.insertAdjacentHTML("beforeend", RestaurantList(restaurants));

    $(document, "#restaurant-list").addEventListener("click", (event) => {
      const restaurantItem = event.target.closest("li");
      const restaurant = this.state.restaurants.find(
        ({ id }) => id === restaurantItem.id
      );

      const $button = event.target.closest("button");
      if ($button && $button.dataset.buttonid === restaurantItem.id) {
        const updatedList = this.props.lunchDomain.toggleFavoriteRestaurant(
          this.state.restaurants,
          restaurantItem.id
        );

        this.setState({ restaurants: updatedList });
        const updatedRestaurant = updatedList.find(
          ({ id }) => id === restaurantItem.id
        );

        const $img = $($button, ".favorite-icon");
        $img.setAttribute(
          "src",
          updatedRestaurant.isFavorite ? filledStar : emptyStar
        );
        return;
      }

      const changeLocalStorageState = (restaurant) => {
        const updatedList = this.props.lunchDomain.toggleFavoriteRestaurant(
          this.state.restaurants,
          restaurant.id
        );
        this.setState({ restaurants: updatedList });
        const updatedRestaurant = updatedList.find(
          ({ id }) => id === restaurant.id
        );
        const $img = $(
          $(document, "#restaurant-info-container"),
          ".favorite-icon"
        );
        $img.setAttribute(
          "src",
          updatedRestaurant.isFavorite ? filledStar : emptyStar
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

  renderContent() {
    const restaurantSection = $(document, ".restaurant-list-container");
    restaurantSection.remove();

    const $restaurantFilterContainer = $(
      document,
      ".restaurant-filter-container"
    );
    $restaurantFilterContainer.replaceChildren();

    if (this.state.activeTab === "favorite") {
      const restaurantsToRender = this.state.restaurants.filter(
        ({ isFavorite }) => isFavorite
      );

      this.renderRestaurantList(
        this.props.lunchDomain.filterAndSortRestaurants(restaurantsToRender)
      );
      return;
    }

    this.renderFilterAndSort($restaurantFilterContainer);
    this.renderRestaurantList(
      this.props.lunchDomain.filterAndSortRestaurants(this.state.restaurants)
    );
  }

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

    new TabNavigation($(document, "main"), {
      onTabChange: this.handleTabChange.bind(this),
    });

    this.renderContent();
  }
}

const app = $(document, "#app");
new App(app, { lunchDomain: lunchRestaurantsService });
