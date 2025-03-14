import Modal from "../components/common/Modal";
import { registerModalClose } from "../components/common/Modal/registerModalClose";
import Title from "../components/common/Title";
import CategorySelector from "../components/FilterSelector/CategorySelector";
import NameOrDistanceSelector from "../components/FilterSelector/NameOrDistanceSelector";
import RegisterForm from "../components/RegisterForm";
import createElement from "../utils/createElement/createElement";
import { $ } from "../utils/dom";
import renderRestaurants from "./renderRestaurant";

const renderAllpage = (restaurantList) => {
  $(".restaurant-filter-container").innerHTML = "";
  $(".restaurant-list").innerHTML = "";

  const filterContainer = $(".restaurant-filter-container");
  filterContainer.appendChild(CategorySelector(restaurantList));
  filterContainer.appendChild(NameOrDistanceSelector(restaurantList));

  renderRestaurants(restaurantList, ...restaurantList.list);
};

export default renderAllpage;
