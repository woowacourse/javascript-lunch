import { LunchItem } from "../components/function/LunchItem.ts";
import { LunchList } from "../components/function/LunchList.ts";
import { getStorage, setStorage } from "./storage.ts";

const getHTML = (id) => document.getElementById(id);
function SubmitEvent(lunchList) {
  document.addEventListener("submit", onSubmit.bind(this));

  function handleRestaurantSubmit(event, form) {
    event.preventDefault();
    const formData = new FormData(form);
    const category = formData.get("category");
    const name = formData.get("name");
    const distance = formData.get("distance");
    const description = formData.get("description");
    const link = formData.get("link");

    lunchList.addRestaurantItem({
      category,
      name,
      distance,
      description,
      link,
    });
    closeModal();
  }

  function deleteStore(event, form) {
    const lunchItemIndex = event.submitter?.value;
    const storageLunchItems = getStorage("lunchItems");

    storageLunchItems.splice(lunchItemIndex, 1);

    setStorage("lunchItems", storageLunchItems);
    LunchList().render();
    LunchList().renderFavorites();
    closeModal();
  }

  function closeModal() {
    const modalBackground = getHTML("modalBackground");
    modalBackground.classList.remove("show");
  }

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target.closest(".modal-form");
    if (!form) return;

    if (form.id === "restaurantForm") {
      handleRestaurantSubmit(event, form);
    }

    if (form.id === "storeDeleteForm") {
      deleteStore(event, form);
    }
    form.reset();
  }
}

export default SubmitEvent;
