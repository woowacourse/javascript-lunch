import { $ } from "../util/selector";

export const handleModalCancelButtonClick = (selector: string) => {
  $(selector)?.classList.remove("modal--open");
  preventScroll();

  const newRestaurantInputs = $("#new-restaurant-form") as HTMLFormElement;
  newRestaurantInputs.reset();
};

export const handleModalOpenButtonClick = (selector: string) => {
  $(selector)?.classList.add("modal--open");

  preventScroll();
};

export const preventScroll = () => {
  const body = $("body") as HTMLBodyElement;
  if (body.style.overflow === "hidden") {
    body.style.overflow = "visible";
  } else {
    body.style.overflow = "hidden";
  }
};
