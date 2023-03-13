import { RestaurantType } from "../Template";
import { $ } from "../until/ControlDom";

interface FilterSortInterFace {
  filterState: string;
  sortState: string;

  getNewList: (restaurantList: RestaurantType[]) => RestaurantType[];
  filter: (restaurantList: RestaurantType[]) => RestaurantType[];
  sort: (restaurantList: RestaurantType[]) => RestaurantType[];
  setFilterSortState: () => void;
}

export const FilterSort: FilterSortInterFace = {
  filterState: "전체",
  sortState: "name",

  getNewList(restaurantList) {
    return this.sort(this.filter(restaurantList));
  },

  filter(restaurantList) {
    if (this.filterState === "전체") return restaurantList;

    return restaurantList.filter(
      (restaurant) => restaurant.category === this.filterState && restaurant
    );
  },

  sort(restaurantList) {
    const sortStandard =
      this.sortState === "distance"
        ? (prev: RestaurantType, next: RestaurantType) =>
            prev.takeTime - next.takeTime
        : (prev: RestaurantType, next: RestaurantType) =>
            prev.name > next.name ? 1 : -1;

    return restaurantList.sort(sortStandard);
  },

  setFilterSortState() {
    const filter = $("#category-filter") as HTMLSelectElement;
    const sortBy = $("#sorting-filter") as HTMLSelectElement;

    FilterSort.filterState =
      filter.options[filter.selectedIndex].value ?? "전체";
    FilterSort.sortState =
      sortBy.options[sortBy.selectedIndex].value ?? "distance";
  },
};
