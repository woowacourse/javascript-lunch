import restaurantStateStore from "../../../store/RestaurantStateStore";
import removeErrorMessageById from "../../../utils/removeErrorMessageById";

const inputDescriptionHandler = (description: HTMLElement) => {
  description.addEventListener("input", (event) => {
    if (event.target instanceof HTMLTextAreaElement) {
      const inputDescription = event.target.value;
      removeErrorMessageById("invalid_description");
      restaurantStateStore.setDescription(inputDescription);
    }
  });
};

const descriptionEventHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const description = document.getElementById("description") as HTMLElement;

    inputDescriptionHandler(description);
  });
};

export default descriptionEventHandler;
