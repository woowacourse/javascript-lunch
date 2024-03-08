import restaurantStateStore from "../../../store/RestaurantStateStore";
import removeHTMLElementByClassName from "../../../utils/removeHTMLElementByClassName";

const descriptionEventHandler = (description: HTMLElement) => {
  description.addEventListener("input", (event) => {
    if (event.target instanceof HTMLTextAreaElement) {
      const inputDescription = event.target.value;
      removeHTMLElementByClassName("invalid_description");
      restaurantStateStore.setDescription(inputDescription);
    }
  });
};

export default descriptionEventHandler;
