import querySelector from "./utils/querySelector.js";
import Store from "./components/store.js";
import storeList from "./storeList.js";
import Button from "./components/button.js";
import optionInput from "./components/optionInput.js";
import textInput from "./components/textInput.js";
import textArea from "./components/textArea.js";
import options from "./constants/options.js";
import helpText from "./constants/helpText.js";
import { modal } from "./utils/uitlsUI.js";

addEventListener("load", () => {
  storeList.forEach((store) => {
    addStore(store);
  });

  querySelector.gnbButton().addEventListener("click", modal.openModal);
  querySelector.modalForm().addEventListener("submit", (e) => updateStore(e));

  modal.addChild(optionInput("category", options.category));
  modal.addChild(textInput("name", true));
  modal.addChild(optionInput("distance", options.distance));
  modal.addChild(textArea("description", helpText.description));
  modal.addChild(textInput("link", false, helpText.link));

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  modal.addButton(buttonContainer, "cancel");
  modal.addButton(buttonContainer, "add");
  modal.addChild(buttonContainer);

  querySelector.modalCancelButton().addEventListener("click", modal.closeModal);
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

  modal.closeModal();

  Array.from(e.target).forEach((item) => {
    item.value = "";
  });
};
