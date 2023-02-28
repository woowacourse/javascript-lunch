import { $ } from "../util/selector";

export const handleModalCancelButtonClick = () => {
  $(".modal--open")?.classList.remove("modal--open");
};
