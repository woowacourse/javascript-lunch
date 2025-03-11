import { LunchItem } from "../components/LunchItem.js";
import { LunchList } from "../components/LunchList.js";

const getHTML = (id) => document.getElementById(id);
const lunchList = LunchList({ targetID: "restaurantListSection" });
class SubmitEvent {
  constructor(elem) {
    elem.addEventListener("submit", this.onSubmit.bind(this));
  }

  handleRestaurantSubmit(event, form) {
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
    this.#closeModal();
  }

  #closeModal() {
    const modalBackground = getHTML("modalBackground");
    modalBackground.classList.remove("show");
  }

  onSubmit(event) {
    event.preventDefault();
    const form = event.target.closest("form");
    if (!form) return;

    if (form.id === "restaurantForm") {
      this.handleRestaurantSubmit(event, form);
    }
    form.reset();
  }
}

new SubmitEvent(document);
