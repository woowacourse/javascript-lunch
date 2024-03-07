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
        description.addEventListener("input", (event) => {
          if (event.target instanceof HTMLSelectElement) {
            const inputDescription = event.target.value;
            removeHTMLElementByClassName("invalid_description");
            restaurantStateStore.setDescription(inputDescription);
          }
        });
      }
    });
  };

  return {
    render,
  };
}

export default InputDescription;
