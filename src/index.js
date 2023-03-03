import AddRestaurant from "./components/AddRestaurant";
import BottomSheet from "./components/BottomSheet";
import CategorySelectBox from "./components/CategorySelectBox";
import NavBar from "./components/NavBar";
import RestaurantList from "./components/RestaurantList";
import SortingSelectBox from "./components/SortingSelectBox";
import Controller from "./domain/Controller";
import "./css/style.css";

const controller = new Controller();
globalThis.controller = controller;

customElements.define("nav-bar", NavBar);
customElements.define("bottom-sheet", BottomSheet);
customElements.define("category-select-box", CategorySelectBox);
customElements.define("sorting-select-box", SortingSelectBox);
customElements.define("add-restaurant", AddRestaurant);
customElements.define("restaurant-list", RestaurantList);
