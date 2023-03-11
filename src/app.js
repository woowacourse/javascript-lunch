import "./global.css";
import Filter from "./components/Filter";
import Header from "./components/Header";
import Tab from "./components/Tab";
import ModalContainer from "./components/modal/ModalContainer";
import RestaurantList from "./components/restaurants/RestaurantList";
import { $ } from "./util/dom";

const modal = new ModalContainer($(".modal"));

const header = new Header($(".gnb"));
const tab = new Tab($(".restaurant-tab-container"));
const filter = new Filter($(".restaurant-filter-container"));
const restaurantList = new RestaurantList($(".restaurant-list-container"), modal);

modal.setEvent(restaurantList);
header.setEvent(modal, restaurantList);
filter.setEvent(restaurantList);
tab.setEvent(restaurantList);
