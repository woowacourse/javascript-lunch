import Modal from './Modal';

class RestaurantDetailModal extends Modal {
  attributeChangedCallback(name) {
    if (name === 'category' && name === 'name' && name === 'distance') {
      this.connectedCallback();
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
    this.closeModalEvent();
  }

  renderDetailRestaurant(restaurant) {
    this.shadowRoot.querySelector('restaurant-detail').update(restaurant);
  }

  static get observedAttributes() {
    return ['category', 'name', 'distance', 'description', 'link'];
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
