import restaurantStateStore from "../../../store/RestaurantStateStore";
import removeHTMLElementByClassName from "../../../utils/removeErrorMessageByClassName";

const descriptionEventHandler = (description: HTMLElement) => {
  description.addEventListener("input", (event) => {
    if (event.target instanceof HTMLTextAreaElement) {
      const inputDescription = event.target.value;
      removeHTMLElementByClassName("invalid_description");
      restaurantStateStore.setDescription(inputDescription);
    }
  });
};

const inputDescriptionHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const description = document.getElementById("description") as HTMLElement;

    descriptionEventHandler(description);
  });
};

export default inputDescriptionHandler;
