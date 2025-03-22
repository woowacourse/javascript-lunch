import Header from "../components/Header.js";
import Modal from "../components/Modal.js";
import Select from "../components/Select.js";
import options from "../constants/options.js";
import storeData from "../data/storeData.js";
import StoreList from "../class/StoreList.ts";
import storeRenderer from "./storeRenderer.js";
import storage from "../utils/storage.ts";
import uiBasicText from "../constants/uiBasicText.js";
import MenuBar from "../components/MenuBar.js";

const initRenderer = {
  // 카테고리/정렬 드롭박스 셋팅

  setRestaurantFilter: (storeList) => {
    document
      .querySelector(".restaurant-filter-container")
      .classList.add("filter-open");

    const categorySelect = Select({
      tag: "select",
      name: "category",
      id: "category-filter",
      classList: ["restaurant-filter"],
      options: options.sortCategory,
      callback: (e) => storeRenderer.filterStore(storeList, e),
    });

    document
      .querySelector(".restaurant-filter-container")
      .appendChild(categorySelect);

    const sortSelect = Select({
      tag: "select",
      name: "sorting",
      id: "sorting-filter",
      classList: ["restaurant-filter"],
      options: options.sortFilter,
      callback: (e) => storeRenderer.sortStore(storeList, e),
    });
    document
      .querySelector(".restaurant-filter-container")
      .appendChild(sortSelect);
  },

  setStoreList: () => {
    storage.setStorage();
    const storeList = new StoreList(storage.getStorageItems());

    storeList.list.forEach((store) => {
      storeRenderer.addStore(store);
    });

    return storeList;
  },
};

export default initRenderer;
