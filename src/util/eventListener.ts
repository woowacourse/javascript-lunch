import { getFormData } from "./form";
import { $ } from "./selector";

export const executeClickEventListener = (
  selector: string,
  callback: () => void
) => {
  $(selector)?.addEventListener("click", callback);
};

export const executeSubmitEventListener = (selector: string, callback: (event:Event) => void) => {
  $(selector)?.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    callback(event);
  });
};
