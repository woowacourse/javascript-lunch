import HeaderEventHandler from "../event/headerEventHandler.js";
import createHeaderView from "../view/createHeaderView.js";

export function HeaderController(modalElement: HTMLDivElement) {
  const headerElement = createHeaderView();
  HeaderEventHandler(headerElement, modalElement);

  return headerElement;
}

export default HeaderController;
