import querySelector from "./utils/querySelector.js";

const storeList = [];

addEventListener("load", () => {
  querySelector.gnbButton().addEventListener("click", () => {
    querySelector.modal().classList.add("modal--open");
  });

  querySelector.modalForm().addEventListener("submit", (e) => updateStore(e));

  querySelector.modalCancelButton().addEventListener("click", closeModal);
});

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

  closeModal();

  Array.from(e.target).forEach((item) => {
    item.value = "";
  });
};

const closeModal = () => {
  querySelector.modal().classList.remove("modal--open");
};
