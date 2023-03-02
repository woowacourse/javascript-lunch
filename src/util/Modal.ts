import { $ } from "./querySelector";

const Modal = {
  open() {
    $(".modal")?.classList.add("modal--open");
  },

  close() {
    $(".modal")?.classList.remove("modal--open");
  },
};
