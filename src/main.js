import querySelector from "./utils/querySelector.js";
import StoreList from "./StoreList.js";
import storeData from "./storeData.js";
import Modal from "./components/Modal.js";
import { headerUtils, modalUtils, storeUtils } from "./utils/utilsUI.js";
import Select from "./components/Select.js";
import options from "./constants/options.js";
import { restaurantFilter } from "./setMain.js";

addEventListener("load", () => {
  headerUtils.addHeader("오늘 뭐 먹지");

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

  restaurantFilter();
  querySelector("#category-filter").addEventListener("change", (e) => {
    storeList.filterStoreList(e.target.value);
    storeUtils.removeStoreElements();
    storeList.filteredList.forEach((store) => {
      storeUtils.addStore(store);
    });
  });

  querySelector("#sorting-filter").addEventListener("change", (e) => {
    storeList.sortStoreList(e.target.value);
    storeUtils.removeStoreElements();
    storeList.filteredList.forEach((store) => {
      storeUtils.addStore(store);
    });
  });
});
