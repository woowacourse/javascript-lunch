import { getFormData } from "./form";
import { $ } from "./selector";

export const executeClickEventListener = (
  selector: string,
  callback: () => void
) => {
  $(selector)?.addEventListener("click", callback);
};

export const executeSubmitEventListener = (selector: string) => {
  $(selector)?.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    getFormData(event);
  });
};
