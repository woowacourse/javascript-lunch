import Store from "../components/Store.js";
import IMG_SRC from "../constants/imgSrc.js";
import storage from "../utils/storage.ts";
import validate from "../utils/validate.ts";
import modalRenderer from "./modalRenderer.js";
import { v4 as uuidv4 } from "uuid";
import options from "../constants/options.js";

const storeRenderer = {
  addStore: (storeProps) => {
    const list = document.createElement("li");
    list.setAttribute("id", storeProps.id);
    list.classList.add("restaurant");
    const starIconId = uuidv4();
    const store = Store(storeProps, starIconId);
    list.innerHTML = store;
    document.querySelector(".restaurant-list").appendChild(list);
  },
  //---
  updateStore: (storeList, e) => {
    const newStore = storeRenderer.createStore(e);

    try {
      e.preventDefault();

      validate.emptySelector(newStore.category);
      validate.nameLength(newStore.name);
      validate.emptySelector(newStore.dist);
      validate.descLength(newStore.description);
      validate.linkForm(newStore.link);

      storeList.updateList(newStore);
      window.localStorage.setItem(
        JSON.stringify(newStore.id),
        JSON.stringify(newStore)
      );

      document
        .querySelector(".all-restaurant-button")
        .classList.add("onMenuBar");
      document
        .querySelector(".favorite-restaurant-button")
        .classList.remove("onMenuBar");

      document.querySelector("#category-filter").value = Object.keys(
        options.sortCategory
      )[0];
      document.querySelector("#sorting-filter").value = Object.keys(
        options.sortFilter
      )[0];

      storeRenderer.removeStoreElements();
      storeList.list.forEach((store) => {
        storeRenderer.addStore(store);
      });

      modalRenderer.closeModal();
    } catch (error) {
      storeRenderer.checkRequired("category", newStore.category, error);
      storeRenderer.checkRequired("name", newStore.name, error);
      storeRenderer.checkRequired("distance", newStore.dist, error);
    }
  },
  //---
  checkRequired: (input, value, error) => {
    if (value === "") {
      const input = document.querySelector(`#${input}`);
      modalRenderer.addErrorText(input, error);
    }
  },
  //---
  createStore: (e) => {
    const data = new FormData(e.target);
    return {
      id: uuidv4(),
      category: data.get("category"),
      name: data.get("name"),
      dist: data.get("distance"),
      description: data.get("description"),
      link: data.get("link"),
      isFavorite: false,
    };
  },

  removeStoreElements: () => {
    document.querySelector(".restaurant-list").replaceChildren();
  },

  filterStore: (storeList, e) => {
    const isFavorite = document
      .querySelector(".onMenuBar")
      .classList.contains("favorite-restaurant-button");
    storeList.filterStoreList(e.target.value, isFavorite);
    storeRenderer.removeStoreElements();
    storeList.filteredList.forEach((store) => {
      storeRenderer.addStore(store);
    });
  },

  sortStore: (storeList, e) => {
    const isFavorite = document
      .querySelector(".onMenuBar")
      .classList.contains("favorite-restaurant-button");
    storeList.sortStoreList(e.target.value);
    storeRenderer.removeStoreElements();

    storeList.filteredList.forEach((store) => {
      storeRenderer.addStore(store);
    });
  },

  toggleFavorite: (storeList, starIcon, storeId) => {
    const storeInfo = storeList.list.find((store) => store.id === storeId);
    storeInfo.isFavorite = !storeInfo.isFavorite;

    starIcon.setAttribute(
      "src",
      storeInfo.isFavorite ? IMG_SRC.STAR_ICON_FILLED : IMG_SRC.STAR_ICON_LINED
    );

    const isFavorite = document
      .querySelector(".onMenuBar")
      .classList.contains("favorite-restaurant-button");
    storage.updateIsFavorite(storeId);
    storeList.updateIsFavorite(storeId, isFavorite);
  },

  setMenuBar: (storeList, e) => {
    document.querySelector("#category-filter").value = "전체";
    document.querySelector("#sorting-filter").value = "name";

    const button = e.target.closest(".menuBar-button");

    const buttonText = button.querySelector(".button-text").textContent;
    if (buttonText === "모든 음식점") {
      storeList.filterByMenuBar(false);
      document
        .querySelector(".all-restaurant-button")
        .classList.add("onMenuBar");
      document
        .querySelector(".favorite-restaurant-button")
        .classList.remove("onMenuBar");
    }
    if (buttonText === "자주 가는 음식점") {
      storeList.filterByMenuBar(true);

      document
        .querySelector(".favorite-restaurant-button")
        .classList.add("onMenuBar");
      document
        .querySelector(".all-restaurant-button")
        .classList.remove("onMenuBar");
    }

    storeRenderer.removeStoreElements();

    storeList.filteredList.forEach((store) => {
      storeRenderer.addStore(store);
    });
  },

  deleteStore: (storeList) => {
    const storeId = document
      .querySelector(".modal-container")
      .getAttribute("id");
    console.log(JSON.stringify(storeId));
    window.localStorage.removeItem(JSON.stringify(storeId));

    const isFavorite = document
      .querySelector(".onMenuBar")
      .classList.contains("favorite-restaurant-button");

    storeList.deleteStore(storeId, isFavorite);

    modalRenderer.closeModal();
    storeRenderer.removeStoreElements();
    storeList.filteredList.forEach((store) => {
      storeRenderer.addStore(store);
    });

    document.querySelector("#category-filter").value = "전체";
    document.querySelector("#sorting-filter").value = "name";
  },
};

export default storeRenderer;
