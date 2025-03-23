import { $ } from "./utils/dom";
import header from "./components/header";
import Modal from "./components/common/modal";
import CategoryAndSortFilter from "./components/categoryAndSortFilter";
import FavoriteTabFilters from "./components/favoriteTabFilter";
import Restaurants from "./model/Restaurants.ts";
import { Filter } from "./domain/filter.ts";
import RestaurantList from "./components/restaurantList/index.js";

addEventListener("load", () => {
  const restaurants = new Restaurants();
  const restaurantsData = restaurants.getFromLocalStorage();

  const filter = new Filter();
  // const filteredRestaurants = filter.filter(restaurantsData);

  RestaurantList(restaurants, filter);

  $("#app").prepend(
    header({
      addRestaurant: restaurants.addRestaurant,
      onChangeCategoryAll: () => {
        filter.filterBySortType("category", "all");
        return filter.filter(restaurantsData);
      },
    })
  );

  $("main").prepend(
    CategoryAndSortFilter({
      onSortByCategory: (category) => {
        filter.filterBySortType("category", category);
        return filter.filter(restaurantsData);
      },
      onSortByOption: (option) => {
        filter.filterBySortType("option", option);
        return filter.filter(restaurantsData);
      },
    })
  );

  $("main").prepend(
    FavoriteTabFilters({
      onSortByFavorite: (favorite) => {
        filter.filterBySortType("favorite", favorite);
        return filter.filter(restaurantsData);
      },
    })
  );

  // TODO: 필터 클래스 적용(모달 닫힐때, 식당 추가할때, 즐겨찾기 눌렀을 때)
  $("main").appendChild(Modal(filter));
});
