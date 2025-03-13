import CategoryFilterController from "./CategoryFilterController.js";
import HeaderController from "./HeaderController.js";
import ListController from "./ListController.js";
import ModalController from "./ModalController.js";

function MainController() {
  const app = document.getElementById("app");
  const mainElement = app.querySelector("main");
  const listContainerElement = mainElement.querySelector(".restaurant-list-container");

  const { listElement, restaurantList, updateList } = ListController(listContainerElement);
  CategoryFilterController(mainElement, updateList);
  HeaderController(app);
  ModalController(mainElement, { listElement, restaurantList });
}

export default MainController;
