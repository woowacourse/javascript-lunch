import Store from "../components/Store.js";
import querySelector from "../utils/querySelector.js";
import validate from "../utils/validate.js";
import modalRenderer from "./modalRenderer.js";

const storeRenderer = {
  addStore: (storeProps) => {
    const list = document.createElement("li");
    list.classList.add("restaurant");
    const store = Store(storeProps);
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
      storeRenderer.addStore(newStore);

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
      category: data.get("category"),
      name: data.get("name"),
      dist: data.get("distance"),
      description: data.get("description"),
      link: data.get("link"),
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
};

export default storeRenderer;
