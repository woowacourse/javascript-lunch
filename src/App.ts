import Header from "./components/header/Header.js";
import BottomSheetBase from "./components/common/bottom-sheet-base/BottomSheetBase.js";
import RestaurantForm from "./components/restaurant-form-section/restaurant-form/RestaurantForm.js";
import RestaurantList from "./components/restaurant-list-section/restaurant-list/RestaurantList.js";
import RestaurantFilter from "./components/restaurant-filter-section/RestaurantFilter.js";
import RestaurantNavBar from "./components/restaurant-nav-bar/RestaurantNavBar.js";
import RestaurantDetail from "./components/restaurant-detail/RestaurantDetail.js";
import RestaurantStore from "./stores/RestaurantStore.js";
import { NavBarKey } from "./../types/types";
import { Restaurant, FilterOptions } from "../types/interfaces.js";
import { CATEGORY, NAV_BAR_KEYS } from "./constants/constants.js";

export default class App {
  private $body!: HTMLElement;
  private $main!: HTMLElement;
  private $restaurantNavBar!: RestaurantNavBar;
  private $restaurantFilter!: RestaurantFilter;
  private $restaurantList!: RestaurantList;
  private $submitFormBottomSheet!: BottomSheetBase;
  private $openDetailBottomSheet!: BottomSheetBase;
  private $restaurantDetail!: RestaurantDetail;

  constructor(private store: RestaurantStore) {
    this.store = store;
    this.render();

    this.store.subscribe("restaurantList", (state) =>
      this.$restaurantList.updateRestaurantList(state.filteredRestaurants)
    );
    this.store.subscribe("restaurantDetail", (state) => {
      this.$restaurantDetail.updateAndOpenDetail(state.selectedRestaurant);
    });
  }

  render() {
    this.$body = document.querySelector("body")!;
    this.#renderHeader();
    this.#renderMain();
  }

  #renderHeader() {
    const $header = new Header({
      onOpen: () => this.$submitFormBottomSheet.open(),
    });
    this.$body.append($header.render());
  }

  #renderMain() {
    this.$main = document.createElement("main");
    this.$body.append(this.$main);

    this.#renderRestaurantNavBar();
    this.#renderRestaurantFilter();
    this.#renderRestaurantList();
    this.#renderSubmitFormBottomSheet();
    this.#renderOpenDetailBottomSheet();
  }

  #renderRestaurantNavBar() {
    this.$restaurantNavBar = new RestaurantNavBar({
      onTabChange: (tabType: NavBarKey) => {
        this.store.setFilter({
          ...this.store.state.currentFilter,
          tabType,
        });
        this.$restaurantFilter.toggleFilterVisibility({ tabType });
      },
    });
    this.$main.append(this.$restaurantNavBar.render());
  }

  #renderRestaurantFilter() {
    this.$restaurantFilter = new RestaurantFilter({
      onFilterChange: (filterType: FilterOptions["filterType"]) => {
        this.store.setFilter({
          ...this.store.state.currentFilter,
          filterType,
        });
      },
    });
    this.$main.append(this.$restaurantFilter.render());
  }

  #renderRestaurantList() {
    const restaurantList = this.store.getFilteredRestaurants({
      tabType: NAV_BAR_KEYS.all,
      filterType: {
        categoryFilterType: CATEGORY[0],
        sortFilterType: "name",
      },
    });
    this.$restaurantList = new RestaurantList(restaurantList, {
      onToggleFavorite: (restaurantId: Restaurant["id"]) => {
        this.store.toggleFavorite(restaurantId);
      },
      onOpenDetail: (restaurantId: Restaurant["id"]) => {
        this.store.updateSelectedRestaurant(restaurantId);
        this.$openDetailBottomSheet.open();
      },
    });
    this.$main.append(this.$restaurantList.render());
  }

  #renderSubmitFormBottomSheet() {
    const $restaurantForm = new RestaurantForm({
      title: "새로운 음식점",
      onSubmit: (newRestaurantInfo: Omit<Restaurant, "id" | "isFavorite">) => {
        this.store.addRestaurant(newRestaurantInfo);
        this.$submitFormBottomSheet.close();
      },
      onCancel: () => this.$submitFormBottomSheet.close(),
    });

    this.$submitFormBottomSheet = new BottomSheetBase({
      id: "submit-form",
      $children: $restaurantForm.render(),
    });

    this.$main.append(this.$submitFormBottomSheet.render());
  }

  #renderOpenDetailBottomSheet() {
    this.$restaurantDetail = new RestaurantDetail({
      onToggleFavorite: (restaurantId: Restaurant["id"]) => {
        this.store.toggleFavorite(restaurantId);
      },
      onDelete: (restaurantId: Restaurant["id"]) => {
        this.store.deleteRestaurant(restaurantId);
      },
      onClose: () => this.$openDetailBottomSheet.close(),
    });

    this.$openDetailBottomSheet = new BottomSheetBase({
      id: "open-detail",
      $children: this.$restaurantDetail.render(),
    });

    this.$main.append(this.$openDetailBottomSheet.render());
  }
}
