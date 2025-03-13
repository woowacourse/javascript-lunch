import CategoryFilterController from "./CategoryFilterController.js";
import HeaderController from "./HeaderController.js";
import ListController from "./ListController.js";
import ModalController from "./ModalController.js";
import TabController from "./TabController.js";

function MainController() {
  const app = document.getElementById("app");
  const mainElement = app.querySelector("main");
  const allListContainerElement = mainElement.querySelector(".all-restaurant-list-container");
  const oftenGoListContainerElement = mainElement.querySelector(".often-go-restaurant-list-container");

  const { listElement, restaurantList, updateList } = ListController(allListContainerElement);
  const { category, sortOption } = CategoryFilterController(allListContainerElement, updateList);
  HeaderController(app);
  ModalController(mainElement, {
    updateList: () => updateList(category, sortOption),
    restaurantList,
  });
  TabController(mainElement, { allListContainerElement, oftenGoListContainerElement });
}

export default MainController;
