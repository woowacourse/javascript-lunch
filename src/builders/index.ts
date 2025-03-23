import { NavBarKey, FilterOptions, Restaurant } from "../../types";
import {
  Header,
  BottomSheetBase,
  RestaurantDetail,
  RestaurantFilter,
  RestaurantForm,
  RestaurantList,
  RestaurantNavBar,
} from "../components/index";

export function createHeader(options: { onOpen: () => void }): Header {
  return new Header(options);
}

export function createRestaurantNavBar(options: {
  onTabChange: (tabType: NavBarKey) => void;
}): RestaurantNavBar {
  return new RestaurantNavBar(options);
}

export function createRestaurantFilter(options: {
  onFilterChange: (filterType: FilterOptions["filterType"]) => void;
}): RestaurantFilter {
  return new RestaurantFilter(options);
}

export function createRestaurantList(
  restaurantList: Restaurant[],
  options: {
    onToggleFavorite: (restaurantId: Restaurant["id"]) => void;
    onOpenDetail: (restaurantId: Restaurant["id"]) => void;
  }
): RestaurantList {
  return new RestaurantList(restaurantList, options);
}

export function createBottomSheetBase(options: {
  id: string;
  $children: DocumentFragment | HTMLFormElement;
}): BottomSheetBase {
  return new BottomSheetBase(options);
}

export function createRestaurantForm(options: {
  title: string;
  onSubmit: (newRestaurantInfo: Omit<Restaurant, "id" | "isFavorite">) => void;
  onCancel: () => void;
}): RestaurantForm {
  return new RestaurantForm(options);
}

export function createRestaurantDetail(options: {
  onToggleFavorite: (restaurantId: Restaurant["id"]) => void;
  onDelete: (restaurantId: Restaurant["id"]) => void;
  onClose: () => void;
}): RestaurantDetail {
  return new RestaurantDetail(options);
}
