import restaurantStateStore from "../../../store/RestaurantStateStore";
import removeHTMLElementByClassName from "../../../utils/removeErrorMessageByClassName";

const inputLinkHandler = (link: HTMLElement) => {
  link.addEventListener("input", (event) => {
    if (event.target instanceof HTMLInputElement) {
      const inputLink = event.target.value;
      removeHTMLElementByClassName("invalid_link");
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
