export class Modal {
  constructor() {
    this.setDefaultModal();
  }

  setDefaultModal() {
    const container = document.createElement("div");
    container.classList.add("modal");
    container.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
        </div>
  `;
    document.querySelector("main").appendChild(container);
  }

  setModalContent(modalContent) {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.innerHTML = "";
    modalContainer.appendChild(modalContent);
    document.querySelector(".modal-backdrop").addEventListener("click", () => {
      Modal.close();
    });
  }

  static open() {
    const modal = document.querySelector(".modal");
    modal.classList.add("modal--open");
  }

  static close() {
    const modalOpen = document.querySelector(".modal--open");
    const modal = document.querySelector(".modal");
    modal.classList.remove("modal--open");
  }
}
