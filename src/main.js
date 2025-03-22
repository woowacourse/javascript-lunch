import { $ } from "./utils/dom";
import header from "./components/Header";
import Modal from "./components/common/Modal";
import Title from "./components/common/Title";
import RegisterForm from "./components/RegisterForm";
import modalClose from "./components/common/Modal/modalClose.js";
import Restaurant from "./domain/Restaurant";
import RestaurantList from "./domain/RestaurantList";
import Tab from "./components/Tab";
import { restaurants } from "./restaurantListData";
import { clearInput } from "./utils/clearInput.js";
import renderAllpage from "./ui/renderAllpage.js";
import renderFavoritePage from "./ui/renderFavoritePage.js";
import Persistence from "./domain/persistence/Persistence.ts";

addEventListener("load", () => {
  Persistence.init({
    restaurantList: restaurants,
    category: "",
    nameOrDistance: "",
    tabInfo: "all",
  });

  const restaurantListData = Persistence.loadRestaurantList();
  const category = Persistence.loadCategory();
  const nameOrDistance = Persistence.loadNameOrDistance();

  const restaurantList = new RestaurantList(restaurantListData);
  restaurantList.category = category;
  restaurantList.nameOrDistance = nameOrDistance;

  const app = $("#app");

  app.prepend(header());

  $("nav").appendChild(
    Tab((seletedTab) => renderPageContent(seletedTab, restaurantList))
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

  if (Persistence.loadTabInfo() === "favorites") {
    $(".tab__item--favorites").click();
  } else {
    $(".tab__item--all").click();
  }
});

const renderPageContent = (selectedTab, restaurantList) => {
  if (selectedTab === "all") {
    renderAllpage(restaurantList);
  } else {
    renderFavoritePage(restaurantList);
  }
};
