import { $ } from "./dom";

export const clearInput = (formSelector) => {
  $(formSelector).reset();
};
