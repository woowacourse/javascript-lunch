import { $ } from "./utils/dom";
import header from "./components/Header";
import Modal from "./components/common/Modal";
import Title from "./components/common/Title";
import RegisterForm from "./components/RegisterForm";
import { registerModalClose } from "./components/common/Modal/registerModalClose";
import Restaurant from "./domain/Restaurant";
import RestaurantList from "./domain/RestaurantList";
import CategorySelector from "./components/FilterSelector/CategorySelector";
import NameOrDistanceSelector from "./components/FilterSelector/NameOrDistanceSelector";
import Tab from "./components/Tab";
import storage from "./domain/storage";
import { restaurants } from "./restaurantListData";
import renderFavoritePage from "./ui/renderFavoritePage";

addEventListener("load", () => {
  initStorage();

  const restaurantListData = storage
    .loadRestaurantList()
    .map((restaurantData) => new Restaurant(restaurantData));

  const restaurantList = new RestaurantList(restaurantListData);

  const app = $("#app");
  app.prepend(header());

  $("nav").appendChild(Tab(restaurantList));

  $("main").appendChild(
    Modal({
      handleCloseModal: registerModalClose,
      id: "register-modal-backdrop",
      classNames: ["register-modal"],
      contents: [
        Title("새로운 음식점", "h2", "modal-title", "text-title"),
        RegisterForm(restaurantList),
      ],
    })
  );

  $("main").appendChild(
    Modal({
      id: "restaurant-detail-modal-backdrop",
      classNames: ["restaurant-detail-modal"],
      handleCloseModal: () => {
        $("#restaurant-detail-modal-backdrop").classList.remove("open");
      },
    })
  );

  if (storage.loadTabInfo() === "favorites") {
    $(".tab__item--favorites").click();
  } else {
    $(".tab__item--all").click();
  }
});

const initStorage = () => {
  if (storage.loadRestaurantList() === null) {
    storage.saveRestaurantList(
      restaurants.map((restaurant) => restaurant.value)
    );
  }
  if (storage.loadCategory() === null) {
    storage.saveCategory("");
  }
  if (storage.loadNameOrDistance() === null) {
    storage.saveNameOrDistance("");
  }
  if (storage.loadTabInfo() === null) {
    storage.saveTabInfo("all");
  }
};
