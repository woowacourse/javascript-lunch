import Modal from './Modal';

class RestaurantDetailModal extends Modal {
  attributeChangedCallback(name) {
    if (name === 'category' && name === 'name' && name === 'distance') {
      this.connectedCallback();
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .modal {
          display: none;
          overflow-x:hidden;
        }
      
      .modal-open {
        display: block;
        overflow-x:hidden;
      }
      
      .backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.35);
      }
    `;

    this.shadowRoot.innerHTML = `
        <div id="modal" class="modal" alt="modal">
            <div id="modalBackdrop" class="backdrop"></div>
            <restaurant-detail></restaurant-detail>
        </div>
    `;

    this.shadowRoot.append(componentStyle);

    this.closeModalEvent();
  }

  renderDetailRestaurant(restaurant) {
    this.shadowRoot.querySelector('restaurant-detail').update(restaurant);
  }

  static get observedAttributes() {
    return ['category', 'name', 'distance', 'description', 'link'];
  }
}

export default RestaurantDetailModal;
