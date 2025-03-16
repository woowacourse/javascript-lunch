import Header from "./components/header/Header.js";
import BottomSheetBase from "./components/common/bottom-sheet-base/BottomSheetBase.js";
import RestaurantForm from "./components/restaurant-form-section/restaurant-form/RestaurantForm.js";
import RestaurantList from "./components/restaurant-list-section/restaurant-list/RestaurantList.js";
import RestaurantFilter from "./components/restaurant-filter-section/RestaurantFilter.js";
import RestaurantNavBar from "./components/restaurant-nav-bar/RestaurantNavBar.js";
import RestaurantDetail from "./components/restaurant-detail/RestaurantDetail.js";
import RestaurantStore from "./stores/RestaurantStore.js";
import RestaurantService from "./services/RestaurantService.js";
import { NavBarKey } from "./../types/types";
import { Restaurant, FilterOptions } from "../types/interfaces.js";

export default class App {
  private $body!: HTMLElement;
  private $main!: HTMLElement;
  private $restaurantNavBar!: RestaurantNavBar;
  private $restaurantFilter!: RestaurantFilter;
  private $restaurantList!: RestaurantList;
  private $submitFormBottomSheet!: BottomSheetBase;
  private $openDetailBottomSheet!: BottomSheetBase;
  private $restaurantDetail!: RestaurantDetail;

  constructor(
    private restaurantStore: RestaurantStore,
    private restaurantService: RestaurantService
  ) {
    this.restaurantStore = restaurantStore;
    this.restaurantService = restaurantService;

    this.render();
    this.restaurantStore.subscribe(() => this.#updateRestaurantList());
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
        this.$restaurantFilter.toggleFilterVisibility({ tabType });
        this.$restaurantList.updateRestaurantList({
          tabType,
          filterType: this.$restaurantFilter.getCurrentFilterType(),
        });
      },
    });
    this.$main.append(this.$restaurantNavBar.render());
  }

  #renderRestaurantFilter() {
    this.$restaurantFilter = new RestaurantFilter({
      onFilterChange: (filterType: FilterOptions["filterType"]) => {
        this.$restaurantList.updateRestaurantList({
          tabType: this.$restaurantNavBar.getCurrentTabType(),
          filterType,
        });
      },
    });
    this.$main.append(this.$restaurantFilter.render());
  }

  #renderRestaurantList() {
    const restaurantList = this.restaurantService.getRestaurants();
    this.$restaurantList = new RestaurantList(restaurantList, {
      getRestaurants: (options: FilterOptions) => {
        return this.restaurantService.getRestaurants(options);
      },
      onToggleFavorite: (restaurantId: Restaurant["id"]) => {
        this.restaurantService.toggleFavorite(restaurantId);
      },
      onOpenDetail: (restaurantId: Restaurant["id"]) => {
        const restaurantInfo: Restaurant | undefined =
          this.restaurantService.getRestaurantInfo(restaurantId);
        if (restaurantInfo) this.$restaurantDetail.openDetail(restaurantInfo);
        this.$openDetailBottomSheet.open();
      },
    });
    this.$main.append(this.$restaurantList.render());
  }

  #renderSubmitFormBottomSheet() {
    const $restaurantForm = new RestaurantForm({
      title: "새로운 음식점",
      onSubmit: this.#handleSubmitForm.bind(this),
      onCancel: () => this.$submitFormBottomSheet.close(),
    });

    this.$submitFormBottomSheet = new BottomSheetBase({
      id: "submit-form",
      $children: $restaurantForm.render(),
    });

    this.$main.append(this.$submitFormBottomSheet.render());
  }

  #handleSubmitForm(newRestaurantInfo: Omit<Restaurant, "id" | "isFavorite">) {
    this.restaurantService.addRestaurant(newRestaurantInfo);
    this.$submitFormBottomSheet.close();
  }

  #renderOpenDetailBottomSheet() {
    this.$restaurantDetail = new RestaurantDetail({
      onToggleFavorite: (restaurantId: Restaurant["id"]) => {
        this.restaurantService.toggleFavorite(restaurantId);
        const updatedInfo: Restaurant | undefined =
          this.restaurantService.getRestaurantInfo(restaurantId);
        if (updatedInfo) this.$restaurantDetail.openDetail(updatedInfo);
      },
      onDelete: (restaurantId: Restaurant["id"]) => {
        this.restaurantService.deleteRestaurant(restaurantId);
      },
      onClose: () => this.$openDetailBottomSheet.close(),
    });

    this.$openDetailBottomSheet = new BottomSheetBase({
      id: "open-detail",
      $children: this.$restaurantDetail.render(),
    });

    this.$main.append(this.$openDetailBottomSheet.render());
  }

  #updateRestaurantList() {
    this.$restaurantList.updateRestaurantList({
      tabType: this.$restaurantNavBar.getCurrentTabType(),
      filterType: this.$restaurantFilter.getCurrentFilterType(),
    });
  }
}
