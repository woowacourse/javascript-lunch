import { $ } from "./dom";

export const clearError = () => {
  $(".error-message")?.remove();
};
