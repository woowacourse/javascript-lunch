import Select from "../components/Select.js";
import options from "../constants/options.js";
import StoreList from "../class/StoreList.ts";
import storeRenderer from "./storeRenderer.js";
import storage from "../utils/storage.ts";
import Store from "../components/store.js";

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
      handleChange: (e) => storeRenderer.filterStore(storeList, e),
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
      handleChange: (e) => storeRenderer.sortStore(storeList, e),
    });
    document
      .querySelector(".restaurant-filter-container")
      .appendChild(sortSelect);
  },

  setStoreList: () => {
    storage.setStorage();
    const storeList = new StoreList(storage.getStorageItems());

    storeList.list.forEach((store) => {
      Store(store);
    });

    return storeList;
  },
};

export default initRenderer;
