import { onClickBackdrop } from "./handleBottomSheet";

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
    onClickBackdrop();
  }
}

export default BottomSheet;
