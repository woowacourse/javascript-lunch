import { LunchItem } from "../components/LunchItem.js";
import { LunchList } from "../components/LunchList.js";

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

  function closeModal() {
    const modalBackground = getHTML("modalBackground");
    modalBackground.classList.remove("show");
  }

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target.closest("form");
    if (!form) return;

    if (form.id === "restaurantForm") {
      handleRestaurantSubmit(event, form);
    }
    form.reset();
  }
}

export default SubmitEvent;
