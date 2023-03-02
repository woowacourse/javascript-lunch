import AddRestaurant from "./components/AddRestaurant";
import BottomSheet from "./components/BottomSheet";
import NavBar from "./components/NavBar";
import RestaurantList from "./components/RestaurantList";
import "./css/style.css";
import Controller from "./domain/Controller";

const controller = new Controller();
globalThis.controller = controller;

customElements.define("nav-bar", NavBar);
customElements.define("bottom-sheet", BottomSheet);
customElements.define("add-restaurant", AddRestaurant);
customElements.define("restaurant-list", RestaurantList);
