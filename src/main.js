import { $ } from "./utils/dom";
import header from "./components/header";
import { mockRestaurants } from "./mockRestaurant";
import Modal from "./components/common/modal";
import Title from "./components/common/title";
import RegisterForm from "./components/registerForm";
import renderRestaurants from "./domain/renderRestaurant";

const restaurantList = [...mockRestaurants];

addEventListener("load", () => {
  $("#app").prepend(header());
  renderRestaurants(restaurantList);

  $("main").appendChild(
    Modal(
      Title("새로운 음식점", "h2", "modal-title", "text-title"),
      RegisterForm(restaurantList)
    )
  );

  $(".modal-backdrop").addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      e.target.classList.remove("open");
    }
  });
});
