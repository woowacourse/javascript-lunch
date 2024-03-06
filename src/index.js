import Header from "./components/header/Header";
import FilterBar from "./components/filter_bar/FilterBar";
import RestaurantList from "./components/restaurant_list/RestaurantList";

import RestaurantListt from "./domain/RestaurantList";

import "../templates/style.css";
import Modal from "./components/modal/Modal";

const mainContainer = document.createElement("main");
mainContainer.setAttribute("id", "mainContainer");
document.body.appendChild(mainContainer);

Modal().render();
Header().render();
FilterBar().render();
RestaurantList().render();

// mainContainer.appendChild(element);

// const restaurantList = new RestaurantListt();
// console.log(restaurantList);
