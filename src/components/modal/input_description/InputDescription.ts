import { inputDescriptionTemplate } from "./template";
import restaurantStateStore from "../../../store/RestaurantStateStore";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";
import removeHTMLElementByClassName from "../../../utils/removeHTMLElementByClassName";

function InputDescription() {
  const render = (form: Element) => {
    form.appendChild(convertHTMLStringToDOM(inputDescriptionTemplate));

    inputDescriptionHandler();
  };

  const inputDescriptionHandler = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const description = document.getElementById("description");

      if (description) {
        descriptionEventHandler(description);
      }
    });
  };

  const descriptionEventHandler = (description: HTMLElement) => {
    description.addEventListener("input", (event) => {
      if (event.target instanceof HTMLTextAreaElement) {
        const inputDescription = event.target.value;
        removeHTMLElementByClassName("invalid_description");
        restaurantStateStore.setDescription(inputDescription);
      }
    });
  };

  return {
    render,
  };
}

export default InputDescription;
