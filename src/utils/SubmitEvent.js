import { LunchItem } from "../components/LunchItem.js";

const getHTML = (id) => document.getElementById(id);

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

    this.#addRestaurantItem({ category, name, distance, description, link });
    this.#closeModal();
  }

  #addRestaurantItem({ category, name, distance, description, link }) {
    LunchItem({
      targetID: "restaurantList",
      category,
      name,
      distance,
      description,
      link,
    });
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
