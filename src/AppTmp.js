import Filter from "./componentsTmp/Filter";
import Header from "./componentsTmp/Header";
import ModalContainer from "./componentsTmp/modal/ModalContainer";
import RestaurantList from "./componentsTmp/restaurantList/RestaurantList";
import { $ } from "./util/dom";

const header = new Header($(".gnb"));
const filter = new Filter($(".restaurant-filter-container"));
const restaurantList = new RestaurantList($(".restaurant-list-container"));
const modal = new ModalContainer($(".modal"));

header.setAddButtonEventListner(modal, restaurantList);
filter.onChangeSelectBox(restaurantList);
