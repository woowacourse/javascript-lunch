import { modalButtonTemplate } from "./template";
import restaurantStateStore from "../../../store/RestaurantStateStore";
import RestaurantListStorageService from "../../../services/restaurantListStorageService";
import RestaurantList from "../../restaurant_list/RestaurantList";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

function ModalButton() {
  const render = (modal: Element, form: Element) => {
    form.appendChild(convertHTMLStringToDOM(modalButtonTemplate));

    submitHandler(modal);
    cancelHandler(modal);
  };

  const submitHandler = (modal: Element) => {
    const submitButton = document.getElementsByClassName("button--primary")[0];
    console.log(submitButton);

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      const restaurantInfo = restaurantStateStore.getRestaurantInfo();
      modal.classList.remove("modal--open");
      RestaurantListStorageService.setData(restaurantInfo);

      RestaurantList().reRender();
    });
  };

  const cancelHandler = (modal: Element) => {
    const cancelButton =
      document.getElementsByClassName("button--secondary")[0];
    console.log(cancelButton);

    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      modal.classList.remove("modal--open");
      console.log("remove");
    });
  };

  return {
    render,
  };
}

export default ModalButton;
