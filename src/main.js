import { $ } from "./utils/dom";
import header from "./components/Header";
import Modal from "./components/common/Modal";
import Title from "./components/common/Title";
import RegisterForm from "./components/RegisterForm";
import renderRestaurants from "./ui/renderRestaurant";
import { registerModalClose } from "./components/common/Modal/registerModalClose";
import { restaurantListData } from "./restaurantListData";
import Restaurant from "./domain/Restaurant";
import RestaurantList from "./domain/RestaurantList";
import CategorySelector from "./components/FilterSelector/CategorySelector";
import NameOrDistanceSelector from "./components/FilterSelector/NameOrDistanceSelector";
import Tab from "./components/Tab";
import renderAllpage from "./ui/renderAllpage";

addEventListener("load", () => {
  const restaurantList = new RestaurantList(restaurantListData);

  const app = $("#app");
  app.prepend(header());

  $("nav").appendChild(Tab(restaurantList));
  $("main").appendChild(
    Modal(
      registerModalClose,
      Title("새로운 음식점", "h2", "modal-title", "text-title"),
      RegisterForm(restaurantList)
    )
  );

  renderAllpage(restaurantList);
});
