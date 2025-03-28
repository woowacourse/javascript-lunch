import List from "../components/List.js";
import RestaurantList from "../domain/RestaurantList.ts";
import SelectSortController from "./SelectSortController.js";
import RestaurantRepository from "../data/RestaurantStorage.js";

function ListController(app, listContainerElement, type = "all") {
  const storedRestaurants = RestaurantRepository.getAll();
  const restaurantList = new RestaurantList(storedRestaurants);
  let listElement;

  listContainerElement.innerHTML = "";

  if (type === "favorite") {
    listElement = List(
      restaurantList.restaurants.filter((restaurant) => restaurant.information.favorites),
      restaurantList,
    );
  }
  if (type === "all") {
    listElement = List(restaurantList.restaurants, restaurantList);
  }
  listContainerElement.appendChild(listElement);
  app.appendChild(listContainerElement);

  return { listElement, restaurantList };
}

export default ListController;
