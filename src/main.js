import { $ } from "./utils/dom";
import header from "./components/header";
import Modal from "./components/common/modal";
import Title from "./components/common/title";
import RegisterForm from "./components/registerForm";
import renderRestaurants from "./ui/renderRestaurant";
import { registerModalClose } from "./components/common/modal/handleCloseModal";
import { restaurantListData } from "./restaurantListData";
import Restaurant from "./domain/Restaurant";
import RestaurantList from "./domain/RestaurantList";

addEventListener("load", () => {
  $("#app").prepend(header());
  const restaurantList = new RestaurantList(restaurantListData);
  renderRestaurants(...restaurantList.list);

  $("main").appendChild(
    Modal(
      registerModalClose,
      Title("새로운 음식점", "h2", "modal-title", "text-title"),
      RegisterForm(restaurantList)
    )
  );
});
