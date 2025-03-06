import Button from "../components/button.js";
import querySelector from "./querySelector.js";

export const modal = {
  addChild: (child) => {
    querySelector.modalForm().appendChild(child);
  },
  closeModal: () => {
    querySelector.modal().classList.remove("modal--open");
  },

  openModal: () => {
    querySelector.modal().classList.add("modal--open");
  },

  addButton: (container, type) => {
    container.appendChild(Button(type));
  },
};
