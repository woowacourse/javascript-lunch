import { FilterOptions, NavBarKey, Restaurant } from "../../types";
import { BottomSheetBase, RestaurantFilter } from "../components";
import RestaurantStore from "../stores/RestaurantStore";

export function handleOpenSubmitForm(
  $submitFormBottomSheet: BottomSheetBase | undefined
) {
  if ($submitFormBottomSheet) $submitFormBottomSheet.open();
}

export function handleOpenDetail(
  restaurantId: Restaurant["id"],
  store: RestaurantStore,
  $openDetailBottomSheet: BottomSheetBase | undefined
) {
  store.updateSelectedRestaurant(restaurantId);
  if ($openDetailBottomSheet) $openDetailBottomSheet.open();
}

export function handleCloseBottomSheet(
  $bottomSheet: BottomSheetBase | undefined
) {
  if ($bottomSheet) $bottomSheet.close();
}

export function handleTabChange(
  tabType: NavBarKey,
  store: RestaurantStore,
  $restaurantFilter: RestaurantFilter | undefined
) {
  store.setFilter({
    ...store.state.currentFilter,
    tabType,
  });
  if ($restaurantFilter) {
    $restaurantFilter.toggleFilterVisibility({ tabType });
  }
}

export function handleFilterChange(
  filterType: FilterOptions["filterType"],
  store: RestaurantStore
) {
  store.setFilter({
    ...store.state.currentFilter,
    filterType,
  });
}

export function handleToggleFavorite(
  restaurantId: Restaurant["id"],
  store: RestaurantStore
) {
  store.toggleFavorite(restaurantId);
}

export function handleSubmitForm(
  newRestaurantInfo: Omit<Restaurant, "id" | "isFavorite">,
  store: RestaurantStore,
  $submitFormBottomSheet: BottomSheetBase | undefined
) {
  store.addRestaurant(newRestaurantInfo);
  if ($submitFormBottomSheet) $submitFormBottomSheet.close();
}

export function handleDeleteRestaurant(
  restaurantId: Restaurant["id"],
  store: RestaurantStore
) {
  store.deleteRestaurant(restaurantId);
}
