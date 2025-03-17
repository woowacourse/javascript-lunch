import { initAppState } from "./domain/initAppState.js";
import { Modal } from "./component/layout/Modal.js";
import { Filter } from "./domain/Filter.js";
import { FoodListPage } from "./pages/FoodListPage.js";

addEventListener("load", () => {
  const filter = new Filter();
  FoodListPage.loadPage({
    title: "점심 뭐 먹지",
  });
  Modal.setDefaultModal();
  initAppState({ filter });
});
