import { $ } from "../util/selector";

export const handleModalCancelButtonClick = (selector: string) => {
  $(selector)?.classList.remove("modal--open");
};
