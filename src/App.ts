import { FilterOptions, NavBarKey, Restaurant } from "../types";
import {
  createBottomSheetBase,
  createHeader,
  createRestaurantDetail,
  createRestaurantFilter,
  createRestaurantForm,
  createRestaurantList,
  createRestaurantNavBar,
} from "./builders";
import {
  BottomSheetBase,
  RestaurantDetail,
  RestaurantFilter,
  RestaurantList,
} from "./components/index";
import { CATEGORY, NAV_BAR_KEYS } from "./constants";
import {
  handleCloseBottomSheet,
  handleDeleteRestaurant,
  handleFilterChange,
  handleOpenDetail,
  handleOpenSubmitForm,
  handleSubmitForm,
  handleTabChange,
  handleToggleFavorite,
} from "./handlers/index.js";
import RestaurantStore from "./stores/RestaurantStore.js";
import { subscribeRestaurantStore } from "./stores/subscribeStore.js";
import render from "./utils/render.js";

export default class App {
  private store: RestaurantStore = new RestaurantStore();
  private $body = document.body;
  private $restaurantFilter: RestaurantFilter | undefined;
  private $restaurantList: RestaurantList | undefined;
  private $submitFormBottomSheet: BottomSheetBase | undefined;
  private $detailBottomSheet: BottomSheetBase | undefined;
  private $restaurantDetail: RestaurantDetail | undefined;

  constructor() {
    this.#initializeCompoenents();

    subscribeRestaurantStore(
      this.store,
      this.$restaurantList,
      this.$restaurantDetail
    );
  }

  #initializeCompoenents() {
    const $header = this.#createHeader();
    const $main = this.#createMain();
    render([$header, $main], this.$body);

    if (!$main) return;
    render(
      [
        this.#createRestaurantNavBar(),
        this.#createRestaurantFilter(),
        this.#createRestaurantList(),
        this.#createSubmitFormBottomSheet(),
        this.#createDetailBottomSheet(),
      ],
      $main
    );
  }

  #createHeader() {
    return createHeader({
      onOpen: () => handleOpenSubmitForm(this.$submitFormBottomSheet),
    }).render();
  }

  #createMain() {
    return document.createElement("main");
  }

  #createRestaurantNavBar() {
    return createRestaurantNavBar({
      onTabChange: (tabType: NavBarKey) =>
        handleTabChange(tabType, this.store, this.$restaurantFilter),
    }).render();
  }

  #createRestaurantFilter() {
    this.$restaurantFilter = createRestaurantFilter({
      onFilterChange: (filterType: FilterOptions["filterType"]) =>
        handleFilterChange(filterType, this.store),
    });

    return this.$restaurantFilter.render();
  }

  #createRestaurantList() {
    const restaurantList = this.store.getFilteredRestaurants({
      tabType: NAV_BAR_KEYS.all,
      filterType: {
        categoryFilterType: CATEGORY[0],
        sortFilterType: "name",
      },
    });
    this.$restaurantList = createRestaurantList(restaurantList, {
      onToggleFavorite: (restaurantId: Restaurant["id"]) =>
        handleToggleFavorite(restaurantId, this.store),
      onOpenDetail: (restaurantId: Restaurant["id"]) =>
        handleOpenDetail(restaurantId, this.store, this.$detailBottomSheet),
    });

    return this.$restaurantList.render();
  }

  #createSubmitFormBottomSheet() {
    const $restaurantForm = createRestaurantForm({
      title: "새로운 음식점",
      onSubmit: (newRestaurantInfo: Omit<Restaurant, "id" | "isFavorite">) =>
        handleSubmitForm(
          newRestaurantInfo,
          this.store,
          this.$submitFormBottomSheet
        ),
      onCancel: () => handleCloseBottomSheet(this.$submitFormBottomSheet),
    });

    this.$submitFormBottomSheet = createBottomSheetBase({
      id: "submit",
      $children: $restaurantForm.render(),
    });

    return this.$submitFormBottomSheet.render();
  }

  #createDetailBottomSheet() {
    this.$restaurantDetail = createRestaurantDetail({
      onToggleFavorite: (restaurantId: Restaurant["id"]) =>
        handleToggleFavorite(restaurantId, this.store),
      onDelete: (restaurantId: Restaurant["id"]) =>
        handleDeleteRestaurant(restaurantId, this.store),
      onClose: () => handleCloseBottomSheet(this.$detailBottomSheet),
    });

    this.$detailBottomSheet = createBottomSheetBase({
      id: "detail",
      $children: this.$restaurantDetail.render(),
    });

    return this.$detailBottomSheet.render();
  }
}
