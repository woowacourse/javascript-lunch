import querySelector from "./utils/querySelector.js";
import Store from "./components/store.js";
import storeList from "./storeList.js";

addEventListener("load", () => {
  storeList.forEach((store) => {
    addStore(store);
  });

  querySelector.gnbButton().addEventListener("click", () => {
    querySelector.modal().classList.add("modal--open");
  });

  querySelector.modalForm().addEventListener("submit", (e) => updateStore(e));

  querySelector.modalCancelButton().addEventListener("click", closeModal);
});

const addStore = (storeProps) => {
  const list = document.createElement("li");
  list.classList.add("restaurant");
  const store = Store(storeProps);
  list.innerHTML = store;
  querySelector.restaurantList().appendChild(list);
};

const updateStore = (e) => {
  e.preventDefault();

  const store = {
    category: e.target[0].value,
    name: e.target[1].value,
    dist: e.target[2].value,
    description: e.target[3].value,
    link: e.target[4].value,
  };
  storeList.push(store);
  addStore(store);

  closeModal();

  Array.from(e.target).forEach((item) => {
    item.value = "";
  });
};

const closeModal = () => {
  querySelector.modal().classList.remove("modal--open");
};
