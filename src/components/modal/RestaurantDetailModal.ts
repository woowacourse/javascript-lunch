import ModalContent from "./ModalContent";

class RestaurantDetailModal extends ModalContent {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
      <h2 class="modal-title text-title">디테일!!!</h2>
    `;
  }
}

export default RestaurantDetailModal;
