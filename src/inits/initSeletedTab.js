import Persistence from "../domain/persistence/Persistence";
import { $ } from "../utils/dom";

const initSeletedTab = () => {
  if (Persistence.loadTabInfo() === "favorites") {
    $(".tab__item--favorites").click();
  } else {
    $(".tab__item--all").click();
  }
};

export default initSeletedTab;
