import { $modal } from "./elements.js";

const AddLunchModal = {
  open() {
    $modal.classList.add("modal--open");
  },

  close() {
    $modal.classList.remove("modal--open");
  },
};

export default AddLunchModal;
