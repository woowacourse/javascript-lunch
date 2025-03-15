import Store from "../components/Store.js";
import IMG_SRC from "../constants/imgSrc.js";
import storage from "../data/storage.js";
import querySelector from "../utils/querySelector.js";
import validate from "../utils/validate.js";
import modalRenderer from "./modalRenderer.js";
import { v4 as uuidv4 } from "uuid";

const storeRenderer = {
  addStore: (storeProps) => {
    const list = document.createElement("li");
    list.setAttribute("id", storeProps.id);
    list.classList.add("restaurant");
    const starIconId = uuidv4();
    const store = Store(storeProps, starIconId);
    list.innerHTML = store;
    querySelector(".restaurant-list").appendChild(list);
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
      storeRenderer.removeStoreElements();
      storeList.filteredList.forEach((store) => {
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
      const input = querySelector(`#${input}`);
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
    querySelector(".restaurant-list").replaceChildren();
  },

  filterStore: (storeList, e) => {
    storeList.filterStoreList(e.target.value);
    storeRenderer.removeStoreElements();
    storeList.filteredList.forEach((store) => {
      storeRenderer.addStore(store);
    });
  },

  sortStore: (storeList, e) => {
    storeList.sortStoreList(e.target.value);
    storeRenderer.removeStoreElements();
    storeList.filteredList.forEach((store) => {
      storeRenderer.addStore(store);
    });
  },

  toggleFavorite: (storeList, starIcon, storeId) => {
    // const starIcon = e.target.closest(".star-icon");

    // if (!starIcon) return;

    // const store = e.target.closest(".restaurant");
    // const storeId = store.getAttribute("id");
    console.log(storeId);
    const storeInfo = storeList.list.find((store) => store.id === storeId);
    storeInfo.isFavorite = !storeInfo.isFavorite;

    starIcon.setAttribute(
      "src",
      storeInfo.isFavorite ? IMG_SRC.STAR_ICON_FILLED : IMG_SRC.STAR_ICON_LINED
    );

    storage.updateIsFavorite(storeId);
  },

  setMenuBar: (storeList, e) => {
    const button = e.target.closest(".menuBar-button");

    const buttonText = button.querySelector(".button-text").textContent;
    let filteredList = [];
    if (buttonText === "모든 음식점")
      filteredList = storeList.filterByMenuBar(false);
    if (buttonText === "자주 가는 음식점")
      filteredList = storeList.filterByMenuBar(true);

    document.querySelectorAll(".menuBar-button").forEach((button) => {
      button.classList.toggle("onMenuBar");
    });

    storeRenderer.removeStoreElements();

    filteredList.forEach((store) => {
      storeRenderer.addStore(store);
    });
  },

  deleteStore: (storeList) => {
    const storeId = querySelector(".modal-container").getAttribute("id");
    window.localStorage.removeItem(JSON.stringify(storeId));

    storeList.deleteStore(storeId);
    console.log(storeList.length);

    modalRenderer.closeModal();
    storeRenderer.removeStoreElements();
    storeList.filteredList.forEach((store) => {
      storeRenderer.addStore(store);
    });
  },
};

export default storeRenderer;
