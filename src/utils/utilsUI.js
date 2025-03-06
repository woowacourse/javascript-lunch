import Button from "../components/button.js";
import querySelector from "./querySelector.js";
import Store from "../components/store.js";
import validate from "./validate.js";

export const modalUtils = {
  addChild: (child) => {
    querySelector.modalForm().appendChild(child);
  },

  closeModal: (e) => {
    const modal = querySelector.modal();
    modal.classList.remove("modal--open");
    const formItems = modal.querySelectorAll("input, textarea, select");

    formItems.forEach((item) => {
      item.value = "";
    });
  },

  openModal: () => {
    querySelector.modal().classList.add("modal--open");
  },

  addButton: (container, type) => {
    container.appendChild(Button(type));
  },
};

export const storeUtils = {
  addStore: (storeProps) => {
    const list = document.createElement("li");
    list.classList.add("restaurant");
    const store = Store(storeProps);
    list.innerHTML = store;
    querySelector.restaurantList().appendChild(list);
  },

  updateStore: (storeList, e) => {
    try {
      e.preventDefault();

      const newStore = storeUtils.createStore(e);
      validate.nameLength(newStore.name);
      validate.descLength(newStore.description);
      validate.linkForm(newStore.link);

      storeList.updateList(newStore);
      storeUtils.addStore(newStore);

      modalUtils.closeModal(e);
    } catch (error) {
      alert(error.message);
    }
  },

  createStore: (e) => {
    return {
      category: e.target[0].value,
      name: e.target[1].value,
      dist: e.target[2].value,
      description: e.target[3].value,
      link: e.target[4].value,
    };
  },
};
