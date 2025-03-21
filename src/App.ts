import { FilterOptions, Restaurant } from "../types/interfaces.js";
import { NavBarKey } from "./../types/types";
import {
  createBottomSheetBase,
  createHeader,
  createMain,
  createRestaurantDetail,
  createRestaurantFilter,
  createRestaurantForm,
  createRestaurantList,
  createRestaurantNavBar,
} from "./components/AppComponents.js";
import BottomSheetBase from "./components/common/bottom-sheet-base/BottomSheetBase.js";
import RestaurantDetail from "./components/restaurant-detail/RestaurantDetail.js";
import RestaurantFilter from "./components/restaurant-filter-section/RestaurantFilter.js";
import RestaurantList from "./components/restaurant-list-section/restaurant-list/RestaurantList.js";
import RestaurantNavBar from "./components/restaurant-nav-bar/RestaurantNavBar.js";
import { CATEGORY, NAV_BAR_KEYS } from "./constants/constants.js";
import RestaurantStore from "./stores/RestaurantStore.js";
import appendElement from "./utils/appendElement.js";

export default class App {
  private $body = document.body;
  private $restaurantNavBar: RestaurantNavBar | undefined;
  private $restaurantFilter: RestaurantFilter | undefined;
  private $restaurantList: RestaurantList | undefined;
  private $submitFormBottomSheet: BottomSheetBase | undefined;
  private $openDetailBottomSheet: BottomSheetBase | undefined;
  private $restaurantDetail: RestaurantDetail | undefined;

  constructor(private store: RestaurantStore) {
    this.#initializeCompoenents();

    this.store.subscribe("restaurantList", (state) => {
      if (this.$restaurantList) {
        this.$restaurantList.updateRestaurantList(state.filteredRestaurants);
      }
    });
    this.store.subscribe("restaurantDetail", (state) => {
      if (this.$restaurantDetail) {
        this.$restaurantDetail.updateAndOpenDetail(state.selectedRestaurant);
      }
    });
  }

  #initializeCompoenents() {
    const $header = this.#createHeader();
    const $main = createMain();
    appendElement([$header, $main], this.$body);

    if (!$main) return;
    appendElement(
      [
        this.#createRestaurantNavBar(),
        this.#createRestaurantFilter(),
        this.#createRestaurantList(),
        this.#createSubmitFormBottomSheet(),
        this.#createOpenDetailBottomSheet(),
      ],
      $main
    );
  }

  #createHeader() {
    return createHeader({
      onOpen: () => {
        if (this.$submitFormBottomSheet) this.$submitFormBottomSheet.open();
      },
    }).render();
  }

  #createRestaurantNavBar() {
    this.$restaurantNavBar = createRestaurantNavBar({
      onTabChange: (tabType: NavBarKey) => {
        this.store.setFilter({
          ...this.store.state.currentFilter,
          tabType,
        });
        if (this.$restaurantFilter) {
          this.$restaurantFilter.toggleFilterVisibility({ tabType });
        }
      },
    });

    return this.$restaurantNavBar.render();
  }

  #createRestaurantFilter() {
    this.$restaurantFilter = createRestaurantFilter({
      onFilterChange: (filterType: FilterOptions["filterType"]) => {
        this.store.setFilter({
          ...this.store.state.currentFilter,
          filterType,
        });
      },
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
      onToggleFavorite: (restaurantId: Restaurant["id"]) => {
        this.store.toggleFavorite(restaurantId);
      },
      onOpenDetail: (restaurantId: Restaurant["id"]) => {
        this.store.updateSelectedRestaurant(restaurantId);
        if (this.$openDetailBottomSheet) this.$openDetailBottomSheet.open();
      },
    });

    return this.$restaurantList.render();
  }

  #createSubmitFormBottomSheet() {
    const $restaurantForm = createRestaurantForm({
      title: "새로운 음식점",
      onSubmit: (newRestaurantInfo: Omit<Restaurant, "id" | "isFavorite">) => {
        this.store.addRestaurant(newRestaurantInfo);
        if (this.$submitFormBottomSheet) this.$submitFormBottomSheet.close();
      },
      onCancel: () => {
        if (this.$submitFormBottomSheet) this.$submitFormBottomSheet.close();
      },
    });

    this.$submitFormBottomSheet = createBottomSheetBase({
      id: "submit-form",
      $children: $restaurantForm.render(),
    });

    return this.$submitFormBottomSheet.render();
  }

  #createOpenDetailBottomSheet() {
    this.$restaurantDetail = createRestaurantDetail({
      onToggleFavorite: (restaurantId: Restaurant["id"]) => {
        this.store.toggleFavorite(restaurantId);
      },
      onDelete: (restaurantId: Restaurant["id"]) => {
        this.store.deleteRestaurant(restaurantId);
      },
      onClose: () => {
        if (this.$openDetailBottomSheet) this.$openDetailBottomSheet.close();
      },
    });

    this.$openDetailBottomSheet = createBottomSheetBase({
      id: "open-detail",
      $children: this.$restaurantDetail.render(),
    });

    return this.$openDetailBottomSheet.render();
  }
}
