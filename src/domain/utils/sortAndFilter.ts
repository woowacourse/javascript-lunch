import {
  RestaurantInfoWithAdditionalInfo,
  Category,
} from "../lunchRestaurantsService.js";

export type SortOptions = "name" | "distance";
export type CategoryFilterOptions = Category | "전체";

const sortAndFilter = (
  restaurantList: RestaurantInfoWithAdditionalInfo[],
  sortOption: SortOptions = "name",
  filterOption: CategoryFilterOptions = "전체"
) => {
  const filterByCategory = (
    restaurantList: RestaurantInfoWithAdditionalInfo[],
    category: CategoryFilterOptions
  ) => {
    if (category === "전체") {
      return restaurantList;
    }
    return restaurantList.filter(
      (restaurant) => restaurant.category === category
    );
  };

  const sorting = (
    restaurantList: RestaurantInfoWithAdditionalInfo[],
    option: SortOptions
  ) => {
    const sortByOptions: Record<
      SortOptions,
      (
        array: RestaurantInfoWithAdditionalInfo[]
      ) => RestaurantInfoWithAdditionalInfo[]
    > = {
      name: (array) => [...array].sort((a, b) => a.name.localeCompare(b.name)),
      distance: (array) => [...array].sort((a, b) => a.distance - b.distance),
    };
    return sortByOptions[option](restaurantList);
  };

  return sorting(filterByCategory(restaurantList, filterOption), sortOption);
};

export default sortAndFilter;
