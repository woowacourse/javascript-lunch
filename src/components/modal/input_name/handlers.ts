import restaurantStateStore from "../../../store/RestaurantStateStore";
import removeErrorMessageById from "../../../utils/removeErrorMessageById";

const inputNameHandler = (input: HTMLElement) => {
  input.addEventListener("input", (event) => {
    if (event.target instanceof HTMLInputElement) {
      const inputValue = event.target.value;
      removeErrorMessageById("invalid_name");
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
