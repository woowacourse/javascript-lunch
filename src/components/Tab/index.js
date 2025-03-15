import storage from "../../domain/storage";
import renderAllpage from "../../ui/renderAllpage";
import renderFavoritePage from "../../ui/renderFavoritePage";
import createElement from "../../utils/createElement/createElement";
import { $ } from "../../utils/dom";
import TabItem from "./TabItem";

const Tab = (restaurantList) => {
  const allTab = TabItem({
    text: "모든 음식점",
    selected: true,
    classNames: ["tab__item--all"],
    events: {
      click: (e) => {
        storage.saveTabInfo("all");

        $(".tab--selected").classList.remove("tab--selected");
        e.target.classList.add("tab--selected");

        renderAllpage(restaurantList);
        $("#category").value = storage.loadCategory();
        $("#category").dispatchEvent(new Event("change"));
        $("#sorting").value = storage.loadNameOrDistance();
        $("#sorting").dispatchEvent(new Event("change"));
      },
    },
  });

  const favoritesTab = TabItem({
    text: "자주 가는 음식점",
    selected: false,
    classNames: ["tab__item--favorites"],
    events: {
      click: (e) => {
        storage.saveTabInfo("favorites");

        $(".tab--selected").classList.remove("tab--selected");
        e.target.classList.add("tab--selected");

        renderFavoritePage(restaurantList);
      },
    },
  });

  const tab = createElement({
    tagName: "section",
    classNames: ["tab"],
    children: [allTab, favoritesTab],
  });

  return tab;
};

export default Tab;
