import HeaderEventHandler from "../event/headerEventHandler.ts";
import createHeaderView from "../view/createHeaderView.js";

class HeaderController {
  headerElement;
  constructor(modalElement: HTMLDivElement) {
    this.headerElement = createHeaderView();
    HeaderEventHandler(this.headerElement, modalElement);
  }

  getHeaderElement() {
    return this.headerElement;
  }
}

export default HeaderController;
