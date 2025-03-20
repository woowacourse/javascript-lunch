import { $ } from "./utils/dom";
import header from "./components/Header";
import Modal from "./components/common/Modal";
import Title from "./components/common/Title";
import RegisterForm from "./components/RegisterForm";
import modalClose from "./components/common/Modal/modalClose.js";
import Restaurant from "./domain/Restaurant";
import RestaurantList from "./domain/RestaurantList";
import Tab from "./components/Tab";
import storage from "./domain/storage.ts";
import { restaurants } from "./restaurantListData";
import { clearInput } from "./utils/clearInput.js";
import renderAllpage from "./ui/renderAllpage.js";
import renderFavoritePage from "./ui/renderFavoritePage.js";

addEventListener("load", () => {
  initStorage();

  const restaurantListData = storage
    .loadRestaurantList()
    .map((restaurantData) => new Restaurant(restaurantData));
  const category = storage.loadCategory();
  const nameOrDistance = storage.loadNameOrDistance();

  const restaurantList = new RestaurantList(restaurantListData);
  restaurantList.setCategory(category);
  restaurantList.setNameOrDistance(nameOrDistance);

  const app = $("#app");

  app.prepend(header());

  $("nav").appendChild(
    Tab(restaurantList, (seletedTab) =>
      renderPageContent(seletedTab, restaurantList)
    )
  );

  $("main").appendChild(
    Modal({
      handleClickBackDrop: () => {
        modalClose("#register-modal-backdrop");
        clearInput("#register-form");
      },
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
      handleClickBackDrop: () => {
        modalClose("#restaurant-detail-modal-backdrop");
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
    storage.saveRestaurantList(restaurants);
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

const renderPageContent = (selectedTab, restaurantList) => {
  if (selectedTab === "all") {
    renderAllpage(restaurantList);
  } else {
    renderFavoritePage(restaurantList);
  }
};
