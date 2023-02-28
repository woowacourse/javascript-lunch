import { $ } from "./selector";

export const executeClickEventListener = (
  selector: string,
  callback: () => void
) => {
  $(selector)?.addEventListener("click", callback);
};
