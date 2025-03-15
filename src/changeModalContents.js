import RestaurantCard from "./components/RestaurantCard";
import RestaurantDetailButtonContainer from "./components/RestaurantDetail/RestaurantDetailButtonContainer";
import storage from "./domain/storage";
import renderAllRestaurant from "./renderAllRestaurant";
import createRestaurantCards from "./service/createRestaurantCards";
import renderRestaurants from "./ui/renderRestaurant";
import { $ } from "./utils/dom";

const changeModalContents = (restaurant, restaurantList) => {
  const restaurantDetailModal = $(".restaurant-detail-modal");
  restaurantDetailModal.innerHTML = "";

  restaurantDetailModal.appendChild(
    RestaurantCard(restaurant, {
      clickFavorite: () => {
        storage.saveRestaurantList(
          restaurantList.list.map((restaurant) => restaurant.value)
        );
        renderRestaurants(
          createRestaurantCards(restaurantList.filter(), {
            clickCard: (restaurant) => {
              $("#restaurant-detail-modal-backdrop").classList.add("open");
              changeModalContents(restaurant, restaurantList);
            },
            clickFavorite: () => {
              storage.saveRestaurantList(
                restaurantList.list.map((restaurant) => restaurant.value)
              );
            },
          })
        );
      },
    })
  );

  restaurantDetailModal.appendChild(
    RestaurantDetailButtonContainer(restaurant, () => {
      clickDelete(restaurant, restaurantList);
    })
  );
};

const clickDelete = (restaurant, restaurantList) => {
  restaurantList.delete(restaurant);

  storage.saveRestaurantList(
    restaurantList.list.map((restaurant) => restaurant.value)
  );

  renderRestaurants(
    createRestaurantCards(restaurantList.filter(), {
      clickCard: (restaurant) => {
        $("#restaurant-detail-modal-backdrop").classList.add("open");
        changeModalContents(restaurant, restaurantList);
      },
      clickFavorite: () => {
        storage.saveRestaurantList(
          restaurantList.list.map((restaurant) => restaurant.value)
        );
      },
    })
  );
};

export default changeModalContents;
