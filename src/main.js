import { $ } from "./utils/dom";
import header from "./components/header";
import Modal from "./components/common/modal";
import Title from "./components/common/title";
import RegisterForm from "./components/registerForm";
import { registerModalClose } from "./components/common/modal/handleCloseModal";
import CategoryAndSortFilter from "./components/categoryAndSortFilter";
import FavoriteTabFilters from "./components/favoriteTabFilter";
import Restaurants from "./model/Restaurants";

addEventListener("load", () => {
  $("#app").prepend(header());

  const restaurantList = new Restaurants();

  $("main").prepend(CategoryAndSortFilter(restaurantList.changeState));
  $("main").prepend(FavoriteTabFilters(restaurantList.changeState));

  $("main").appendChild(
    Modal({
      handleClose: registerModalClose,
      headerComponent: Title(
        "새로운 음식점",
        "h2",
        "modal-title",
        "text-title"
      ),
      bodyComponent: RegisterForm(restaurantList.pushList),
    })
  );
});
