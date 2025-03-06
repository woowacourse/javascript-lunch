import { $ } from "./dom";

export const clearInput = (formElement) => {
  $(formElement).reset();
};
