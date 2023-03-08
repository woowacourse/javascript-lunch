import Filter from "./componentsTmp/Filter";
import Header from "./componentsTmp/Header";
import ModalContainer from "./componentsTmp/modal/ModalContainer";
import RestaurantList from "./componentsTmp/restaurantList/RestaurantList";

const $header = document.querySelector(".gnb");
const $filter = document.querySelector(".restaurant-filter-container");
const $restaurantList = document.querySelector(".restaurant-list-container");
const $modal = document.querySelector(".modal");

const header = new Header($header);
const filter = new Filter($filter);
const restaurantList = new RestaurantList($restaurantList);
const modal = new ModalContainer($modal);

header.setAddButtonEventListner(modal, restaurantList);
filter.onChangeSelectBox(restaurantList);
