import { inputNameTemplate } from "./template";
import restaurantStateStore from "../../../store/RestaurantStateStore";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";
import removeHTMLElementByClassName from "../../../utils/removeHTMLElementByClassName";

function InputName() {
  const render = (form: Element) => {
    form.appendChild(convertHTMLStringToDOM(inputNameTemplate));

    inputNameHandler();
  };

  const inputNameHandler = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const input = document.getElementById("name");
      console.log(input);

      if (input) {
        inputNameEventHandler(input);
      }
    });
  };

  const inputNameEventHandler = (input: HTMLElement) => {
    input.addEventListener("input", (event) => {
      if (event.target instanceof HTMLInputElement) {
        const inputValue = event.target.value;
        removeHTMLElementByClassName("invalid_name");
        restaurantStateStore.setName(inputValue);
      }
    });
  };

  return {
    render,
  };
}

export default InputName;
