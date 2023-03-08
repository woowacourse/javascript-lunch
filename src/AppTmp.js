import Filter from "./componentsTmp/Filter";
import Header from "./componentsTmp/Header";
import ModalContainer from "./componentsTmp/modal/ModalContainer";
import RestaurantList from "./componentsTmp/restaurantList/RestaurantList";
import { $ } from "./util/dom";

const $header = $(".gnb");
const $filter = $(".restaurant-filter-container");
const $restaurantList = $(".restaurant-list-container");
const $modal = $(".modal");

const header = new Header($header);
const filter = new Filter($filter);
const restaurantList = new RestaurantList($restaurantList);
const modal = new ModalContainer($modal);

header.setAddButtonEventListner(modal, restaurantList);
filter.onChangeSelectBox(restaurantList);
