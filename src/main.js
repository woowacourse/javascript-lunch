import querySelector from "./utils/querySelector.js";
import StoreList from "./StoreList.js";
import storeData from "./storeData.js";
import Modal from "./components/Modal.js";
import { modalUtils, storeUtils } from "./utils/utilsUI.js";

addEventListener("load", () => {
  const storeList = new StoreList(storeData);
  storeList.list.forEach((store) => {
    storeUtils.addStore(store);
  });
  const modal = Modal();
  querySelector("main").appendChild(modal);

  querySelector(".gnb__button").addEventListener("click", () => {
    querySelector(".modal").classList.add("modal--open");
    modalUtils.addForm();

    querySelector(".modal-form").addEventListener("submit", (e) =>
      storeUtils.updateStore(storeList, e)
    );
  });

  querySelector(".modal-backdrop").addEventListener(
    "click",
    modalUtils.closeModal
  );
});
