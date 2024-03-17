import restaurantStateStore from "../../../store/RestaurantStateStore";
import removeErrorMessageById from "../../../utils/removeErrorMessageById";

const inputLinkHandler = (link: HTMLElement) => {
  link.addEventListener("input", (event) => {
    if (event.target instanceof HTMLInputElement) {
      const inputLink = event.target.value;
      removeErrorMessageById("invalid_link");
      restaurantStateStore.setLink(inputLink);
    }
  });
};

const linkEventHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("link") as HTMLElement;

    inputLinkHandler(link);
  });
};

export default linkEventHandler;
