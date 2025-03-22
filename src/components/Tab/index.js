import Persistence from "../../domain/persistence/Persistence";
import createElement from "../../utils/createElement/createElement";
import { $ } from "../../utils/dom";
import TabItem from "./TabItem";

const Tab = (handleSeletedTabChange) => {
  const allTab = TabItem({
    text: "모든 음식점",
    selected: true,
    classNames: ["tab__item--all"],
    events: {
      click: (e) => {
        Persistence.saveTabInfo("all");

        $(".tab--selected").classList.remove("tab--selected");
        e.target.classList.add("tab--selected");

        handleSeletedTabChange("all");
        $("#category-sorting").value = Persistence.loadCategory();
        $("#sorting").value = Persistence.loadNameOrDistance();
      },
    },
  });

  const favoritesTab = TabItem({
    text: "자주 가는 음식점",
    selected: false,
    classNames: ["tab__item--favorites"],
    events: {
      click: (e) => {
        Persistence.saveTabInfo("favorites");

        $(".tab--selected").classList.remove("tab--selected");
        e.target.classList.add("tab--selected");

        handleSeletedTabChange("favorites");
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
