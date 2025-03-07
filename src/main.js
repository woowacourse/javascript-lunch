import createButton from "./components/button/button.js";
import createDropdownBox from "./components/dropdown/dropdown.js";
import createInputBox from "./components/input/input.js";
import createRestaurantForm from "./components/restaurant/form/form.js";
import createRestaurantItem from "./components/restaurant/item/item.js";
import createTextAreaBox from "./components/textarea/textarea.js";

const app = document.querySelector("#app");

function bottomSheetController() {
  let isFirstRender = false;

  function handleBottomSheetToggle(event) {
    const modal = document.querySelector(".modal");

    if (event.target.closest(".restaurant-add-button")) {
      modal.showModal();

      if (!isFirstRender) {
        const modalContainer = document.querySelector(".modal-container");
        const restaurantFrom = createRestaurantForm();

        modalContainer.appendChild(restaurantFrom);
        isFirstRender = true;
      }
    }

    if (event.target.closest(".modal-backdrop")) {
      modal.close();
    }
  }

  return { handleBottomSheetToggle };
}

const { handleBottomSheetToggle } = bottomSheetController();

document.body.addEventListener("click", handleBottomSheetToggle);
