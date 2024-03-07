import { inputNameTemplate } from "./template";
import restaurantStateStore from "../../../store/RestaurantStateStore";

function InputName() {
  const render = (form: Element) => {
    form.innerHTML += inputNameTemplate;

    inputNameHandler();
  };

  const inputNameHandler = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const input = document.getElementById("name");

      if (input) {
        input.addEventListener("input", (e) => {
          const target = e.target as HTMLInputElement;
          if (target) {
            restaurantStateStore.setName(target.value);
          }
        });
      }
    });
  };

  const inputNameErrorHandler = () => {};

  return {
    render,
  };
}

export default InputName;
