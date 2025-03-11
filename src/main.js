import { $ } from "./utils/dom";
import header from "./components/header";
import Modal from "./components/common/modal";
import Title from "./components/common/title";
import RegisterForm from "./components/registerForm";
import { registerModalClose } from "./components/common/modal/handleCloseModal";
import { restaurantList } from "./restaurantList";
import Restaurants from "./components/restaurants";
import CategoryAndSortFilter from "./components/categoryAndSortFilter";

addEventListener("load", () => {
  $("#app").prepend(header());
  $("main").prepend(CategoryAndSortFilter());

  Restaurants(...restaurantList);

  $("main").appendChild(
    Modal({
      handleClose: registerModalClose,
      headerComponent: Title(
        "새로운 음식점",
        "h2",
        "modal-title",
        "text-title"
      ),
      bodyComponent: RegisterForm(),
    })
  );
});
