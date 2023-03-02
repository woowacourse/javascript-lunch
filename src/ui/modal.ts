import { $ } from "../util/selector";

export const handleModalCancelButtonClick = (selector: string) => {
  $(selector)?.classList.remove("modal--open");
};

export const handleModalOpenButtonClick = (selector: string) => {
  $(selector)?.classList.add("modal--open");
};
