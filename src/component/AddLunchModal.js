import { DOM } from "../utils/dom.js";

const AddLunchModal = {
  open() {
    DOM.$modal.classList.add("modal--open");
  },

  close() {
    DOM.$modal.classList.remove("modal--open");
  },
};

export default AddLunchModal;
