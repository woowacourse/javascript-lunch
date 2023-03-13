import Modal from './Modal';

class RestaurantDetailModal extends Modal {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle(2);
    this.closeModalEvent();
  }

  renderDetailRestaurant(restaurant) {
    this.shadowRoot.querySelector('restaurant-detail').update(restaurant);
  }

  render() {
    this.shadowRoot.innerHTML = `
    <div id="modal" class="modal" alt="modal">
        <div id="modalBackdrop" class="backdrop"></div>
        <restaurant-detail></restaurant-detail>
    </div>
`;
  }
}

export default RestaurantDetailModal;
