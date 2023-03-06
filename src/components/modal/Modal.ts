class CustomModal extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form is="restaurant-add-form"></form>
        </div>
      </div>
    `;
  }
}

const createCustomModal = () => {
  customElements.define("custom-modal", CustomModal);
};

export default createCustomModal;
