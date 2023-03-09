import Filter from "./components/Filter";
import Header from "./components/Header";
import ModalContainer from "./components/modal/ModalContainer";
import RestaurantList from "./components/restaurantList/RestaurantList";
import { $ } from "./util/dom";

const header = new Header($(".gnb"));
const filter = new Filter($(".restaurant-filter-container"));
const restaurantList = new RestaurantList($(".restaurant-list-container"));
const modal = new ModalContainer($(".modal"));

header.setAddButtonEventListner(modal, restaurantList);
filter.onChangeSelectBox(restaurantList);
