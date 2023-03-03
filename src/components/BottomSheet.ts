class BottomSheet extends HTMLElement {
  constructor() {
    super();
  }

  render(children: string) {
    this.innerHTML = `
    <div id="modalBackdrop" class="modal-backdrop"></div>
    <div id="foo" class="modal-container">
    ${children}
    </div>
    `;
    this.onClickBackdrop();
  }

  onClickBackdrop() {
    const modalBackdrop = document.getElementById("modalBackdrop");
    modalBackdrop?.addEventListener("click", () => {
      this.close();
    });
  }

  open(children: string) {
    const bottomSheet = document.getElementById("bottomSheet");
    bottomSheet?.classList.add("modal--open");
    this.render(children);
  }

  close() {
    const bottomSheet = document.getElementById("bottomSheet");
    bottomSheet?.classList.remove("modal--open");
    this.render("");
  }
}

export default BottomSheet;
