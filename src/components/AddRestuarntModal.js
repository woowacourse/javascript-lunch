import Modal from './Modal';

class AddRestaurantModal extends Modal {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle(2);
    this.closeModalEvent();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <div id="modal" class="modal" alt="modal">
        <div id="modalBackdrop" class="backdrop"></div>
       <add-restaurant-form></add-restaurant-form>
    </div>
`;
  }
}

export default AddRestaurantModal;
