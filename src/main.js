import querySelector from "./utils/querySelector.js";

addEventListener("load", () => {
  querySelector.gnbButton().addEventListener("click", () => {
    querySelector.modal().classList.add("modal--open");
  });

  querySelector.modalCancelButton().addEventListener("click", () => {
    querySelector.modal().classList.remove("modal--open");
  });
});
