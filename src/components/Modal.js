function createModal() {
  const modal = `<div class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id="new-restaurant-form"></form>
      </div>
    </div>`;

  return modal;
}

export default createModal;
