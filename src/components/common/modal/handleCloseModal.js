import { clearError } from "../../../utils/clearError";
import { clearInput } from "../../../utils/clearInput";
import { $ } from "../../../utils/dom";

export const registerModalClose = () => {
  $("#register-form-modal").classList.remove("open");
  clearInput("#register-form");
  clearError();
};
