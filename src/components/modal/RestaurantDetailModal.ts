import ModalContent from "./ModalContent";
import restaurantState from "../../states/restaurants";

class RestaurantDetailModal extends ModalContent {
  #name: string | null;

  static get observedAttributes() {
    return ["name"];
  }

  constructor() {
    super();

    this.#name = this.getAttribute("name");
  }

  render() {
    if (this.#name === null) return;

    const restaurant = restaurantState.getTargetRestaurant(this.#name);

    if (!restaurant) return;

    this.innerHTML = `
      <h2 class="modal-title text-title">${restaurant.name}</h2>
    `;
  }

  attributeChangedCallback(
    attName: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue === newValue) return;
    if (attName !== "name") return;

    this.#name = newValue;
    this.render();
  }

  setNameAttribute(name: string) {
    this.setAttribute("name", name);
  }
}

export default RestaurantDetailModal;
