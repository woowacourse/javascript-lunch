import Modal from "../components/common/Modal";
import { registerModalClose } from "../components/common/Modal/registerModalClose";
import Title from "../components/common/Title";
import CategorySelector from "../components/FilterSelector/CategorySelector";
import NameOrDistanceSelector from "../components/FilterSelector/NameOrDistanceSelector";
import RegisterForm from "../components/RegisterForm";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantDetail from "../components/RestaurantDetail";
import RestaurantDetailButtonContainer from "../components/RestaurantDetail/RestaurantDetailButtonContainer";
import Restaurant from "../domain/Restaurant";
import createRestaurantCards from "../service/createRestaurantCards";
import createElement from "../utils/createElement/createElement";
import { $ } from "../utils/dom";
import renderRestaurants from "./renderRestaurant";

const renderAllpage = (restaurantList) => {
  $(".restaurant-filter-container").innerHTML = "";
  $(".restaurant-list").innerHTML = "";

  const filterContainer = $(".restaurant-filter-container");
  filterContainer.appendChild(CategorySelector(restaurantList));
  filterContainer.appendChild(NameOrDistanceSelector(restaurantList));

  renderAllRestaurant(restaurantList);
};

const renderAllRestaurant = (restaurantList) => {
  renderRestaurants(
    createRestaurantCards(restaurantList.list, {
      clickCard: (restaurant) => {
        $("#restaurant-detail-modal-backdrop").classList.add("open");
        changeModalContents(restaurant, restaurantList);
      },
    })
  );
};

const clickDelete = (restaurant, restaurantList) => {
  restaurantList.delete(restaurant);
  renderAllRestaurant(restaurantList);
};

const changeModalContents = (restaurant, restaurantList) => {
  const restaurantDetailModal = $(".restaurant-detail-modal");
  restaurantDetailModal.innerHTML = "";

  restaurantDetailModal.appendChild(
    RestaurantCard(restaurant, {
      clickFavorite: () => {
        renderAllRestaurant(restaurantList);
      },
    })
  );

  restaurantDetailModal.appendChild(
    RestaurantDetailButtonContainer(restaurant, () => {
      clickDelete(restaurant, restaurantList);
    })
  );
};

export default renderAllpage;
