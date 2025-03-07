import querySelector from "./utils/querySelector.js";
import StoreList from "./StoreList.js";
import storeData from "./storeData.js";
import createModal from "./components/modal.js";
import { modalUtils, storeUtils } from "./utils/utilsUI.js";

addEventListener("load", () => {
  const storeList = new StoreList(storeData);
  storeList.list.forEach((store) => {
    storeUtils.addStore(store);
  });
  const modal = createModal();
  document.querySelector("main").appendChild(modal);

  querySelector.gnbButton().addEventListener("click", () => {
    querySelector.modal().classList.add("modal--open");
    modalUtils.addForm();

    querySelector
      .modalForm()
      .addEventListener("submit", (e) => storeUtils.updateStore(storeList, e));
  });

  querySelector
    .modalBackdrop()
    .addEventListener("click", modalUtils.closeModal);
});
