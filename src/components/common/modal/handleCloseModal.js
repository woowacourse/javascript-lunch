import { clearInput } from "../../../utils/clearInput";
import { $ } from "../../../utils/dom";

export const registerModalClose = () => {
  $(".modal-backdrop").classList.remove("open");
  clearInput("#register-form");
};
