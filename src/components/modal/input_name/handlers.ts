import removeHTMLElementByClassName from "../../../utils/removeHTMLElementByClassName";
import restaurantStateStore from "../../../store/RestaurantStateStore";

export const inputNameHandler = () => {
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
