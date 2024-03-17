import restaurantStateStore from "../../../store/RestaurantStateStore";
import removeHTMLElementByClassName from "../../../utils/removeErrorMessageByClassName";

const inputNameHandler = (input: HTMLElement) => {
  input.addEventListener("input", (event) => {
    if (event.target instanceof HTMLInputElement) {
      const inputValue = event.target.value;
      removeHTMLElementByClassName("invalid_name");
      restaurantStateStore.setName(inputValue);
    }
  });
};

const nameEventHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("name") as HTMLElement;

    inputNameHandler(input);
  });
};
export default nameEventHandler;
