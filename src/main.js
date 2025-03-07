import { $ } from "./utils/dom";
import header from "./components/header";
import Modal from "./components/common/modal";
import Title from "./components/common/title";
import RegisterForm from "./components/registerForm";
import renderRestaurants from "./domain/renderRestaurant";
import { registerModalClose } from "./components/common/modal/handleCloseModal";
import { restaurantList } from "./restaurantList";

addEventListener("load", () => {
  $("#app").prepend(header());
  renderRestaurants(...restaurantList);

  $("main").appendChild(
    Modal(
      registerModalClose,
      Title("새로운 음식점", "h2", "modal-title", "text-title"),
      RegisterForm()
    )
  );
});
