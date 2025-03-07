export function createModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.classList.add("modal--open");
  modal.innerHTML = /*html*/ `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2>주렁 추가</h2>
      </div>
    `;

  return modal;
}
