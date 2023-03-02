class BottomSheet extends HTMLElement {
  state: { isOpen: boolean };

  constructor() {
    super();
    this.state = { isOpen: false };
    this.render();
    this.onClickBackdrop();
  }

  render() {
    this.insertAdjacentHTML(
      "afterbegin",
      `
      <div id="modalBackdrop" class="modal-backdrop"></div>
      <div class="modal-container"></div>
    `
    );
  }

  onClickBackdrop() {
    const modalBackdrop = document.getElementById("modalBackdrop");
    modalBackdrop?.addEventListener("click", () => {
      this.close();
    });
  }

  open() {
    const bottomSheet = document.getElementById("bottomSheet");
    bottomSheet?.classList.add("modal--open");
  }

  close() {
    const bottomSheet = document.getElementById("bottomSheet");
    bottomSheet?.classList.remove("modal--open");
  }
}

export default BottomSheet;
