import { inputLinkTemplate } from "./template";
import restaurantStateStore from "../../../store/RestaurantStateStore";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";
import removeHTMLElementByClassName from "../../../utils/removeHTMLElementByClassName";

function InputLink() {
  const render = (form: Element) => {
    form.appendChild(convertHTMLStringToDOM(inputLinkTemplate));

    inputLinkHandler();
  };

  const inputLinkHandler = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const link = document.getElementById("link");

      if (link) {
        link.addEventListener("input", (event) => {
          if (event.target instanceof HTMLInputElement) {
            const inputLink = event.target.value;
            removeHTMLElementByClassName("invalid_link");
            restaurantStateStore.setLink(inputLink);
          }
        });
      }
    });
  };

  return {
    render,
  };
}

export default InputLink;
