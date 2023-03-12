import AddRestaurant from "./components/AddRestaurant";
import BottomSheet from "./components/BottomSheet";
import CategorySelectBox from "./components/CategorySelectBox";
import FavoriteButton from "./components/FavoriteButton";
import MenuTab from "./components/MenuTab";
import NavBar from "./components/NavBar";
import RestaurantItem from "./components/RestaurantItem";
import RestaurantList from "./components/RestaurantList";
import RestaurantView from "./components/RestaurantView";
import SortingSelectBox from "./components/SortingSelectBox";
import "./css/style.css";
import "./css/layout.css";
import "./css/tab-menu.css";
import { restoreRestaurants } from "./domain/restaurant";
import { restaurants } from "./domain/restaurants";

restaurants.create();

customElements.define("nav-bar", NavBar);
customElements.define("menu-tab", MenuTab);
customElements.define("bottom-sheet", BottomSheet);
customElements.define("category-select-box", CategorySelectBox);
customElements.define("sorting-select-box", SortingSelectBox);
customElements.define("add-restaurant", AddRestaurant);
customElements.define("restaurant-view", RestaurantView);
customElements.define("restaurant-list", RestaurantList);
customElements.define("restaurant-item", RestaurantItem);
customElements.define("favorite-button", FavoriteButton);

restoreRestaurants();
