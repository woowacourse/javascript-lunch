import querySelector from "./utils/querySelector.js";
import StoreList from "./StoreList.js";
import Store from "./components/store.js";
import storeData from "./storeData.js";
import Button from "./components/button.js";
import optionInput from "./components/optionInput.js";
import textInput from "./components/textInput.js";
import textArea from "./components/textArea.js";
import options from "./constants/options.js";
import helpText from "./constants/helpText.js";
import { modalUtils, storeUtils } from "./utils/utilsUI.js";

addEventListener("load", () => {
  const storeList = new StoreList(storeData);
  storeList.list.forEach((store) => {
    storeUtils.addStore(store);
  });

  querySelector.gnbButton().addEventListener("click", modalUtils.openModal);
  querySelector
    .modalForm()
    .addEventListener("submit", (e) => storeUtils.updateStore(storeList, e));

  modalUtils.addChild(optionInput("category", options.category));
  modalUtils.addChild(textInput("name", true));
  modalUtils.addChild(optionInput("distance", options.distance));
  modalUtils.addChild(textArea("description", helpText.description));
  modalUtils.addChild(textInput("link", false, helpText.link));

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  modalUtils.addButton(buttonContainer, "cancel");
  modalUtils.addButton(buttonContainer, "add");
  modalUtils.addChild(buttonContainer);

  querySelector
    .modalCancelButton()
    .addEventListener("click", (e) => modalUtils.closeModal(e));
});
