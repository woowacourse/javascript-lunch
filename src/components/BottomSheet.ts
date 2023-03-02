class BottomSheet extends HTMLElement {
  state: { isOpen: boolean };

  constructor() {
    super();
    this.state = { isOpen: false };
    this.onClickBackdrop();
  }

  render(children: string) {
    this.innerHTML = `
      <div id="modalBackdrop" class="modal-backdrop"></div>
      <div id="foo" class="modal-container">
        ${children}
      </div>
    `;
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
