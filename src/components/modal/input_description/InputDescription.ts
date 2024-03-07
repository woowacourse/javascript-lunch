import { inputDescriptionTemplate } from "./template";
import restaurantStateStore from "../../../store/RestaurantStateStore";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

function InputDescription() {
  const render = (form: Element) => {
    form.appendChild(convertHTMLStringToDOM(inputDescriptionTemplate));

    inputDescriptionHandler();
  };

  const inputDescriptionHandler = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const description = document.getElementById("description");

      if (description) {
        description.addEventListener("input", (e) => {
          const target = e.target as HTMLTextAreaElement;
          if (target) {
            restaurantStateStore.setDescription(target.value);
            // console.log(target.value);
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
