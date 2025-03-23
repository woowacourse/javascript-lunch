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

  RestaurantList(restaurants, filter);

  $("#app").prepend(
    header({
      addRestaurant: restaurants.addRestaurant,
      onChangeCategoryAll: () => {
        filter.filterBySortType("category", "all");
        RestaurantList(restaurants, filter);
      },
    })
  );

  $("main").prepend(
    CategoryAndSortFilter({
      onSortByCategory: (category) => {
        filter.filterBySortType("category", category);
        RestaurantList(restaurants, filter);
      },
      onSortByOption: (option) => {
        filter.filterBySortType("option", option);
        RestaurantList(restaurants, filter);
      },
    })
  );

  $("main").prepend(
    FavoriteTabFilters({
      onSortByFavorite: (favorite) => {
        filter.filterBySortType("favorite", favorite);
        RestaurantList(restaurants, filter);
      },
    })
  );

  $("main").appendChild(
    Modal({
      renderRestaurants: () => RestaurantList(restaurants, filter),
    })
  );
});
