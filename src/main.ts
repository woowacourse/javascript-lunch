import { Modal } from "./component/layout/Modal.js";

import loadFoodListPage from "./domain/page/loadFoodListPage.js";
import { loadInitAppState } from "./domain/page/loadinitAppState.js";

addEventListener("load", () => {
  loadFoodListPage({ title: "점심 뭐 먹지" });
  Modal.loadDefaultModal();
  loadInitAppState();
});
