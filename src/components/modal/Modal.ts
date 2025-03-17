import { BaseProps, BaseState } from "../../../types/common.js";
import { isHTMLElement } from "../../utils";
import { Component } from "../core";

interface ModalState extends BaseState {
  isOpen: boolean;
}

abstract class Modal<Props extends BaseProps = {}> extends Component<
  ModalState,
  Props
> {
  private handleOpen!: () => void;
  private triggerSelectors: string[] = [];
  private $triggerButtons: HTMLElement[] = [];

  override setup() {
    this.setState({
      isOpen: false,
    });
    this.watchState("isOpen", () => this.initialRender());

    this.eventBindings.push({
      action: "close-modal",
      eventType: "click",
      handler: () => this.close(),
    });

    this.handleOpen = () => this.open();
  }

  protected contents() {
    return "";
  }

  protected setupTriggerButtons(selectors: string[] = []) {
    this.triggerSelectors = selectors;

    const runIfTriggersExist: () => void = this.triggerSelectors.length
      ? () => {
          this.$triggerButtons = this.triggerSelectors
            .map((selector) => Array.from(document.querySelectorAll(selector)))
            .flat()
            .filter((el): el is HTMLElement => isHTMLElement(el));

          this.$triggerButtons.forEach((button) => {
            button.removeEventListener("click", this.handleOpen);
            button.addEventListener("click", this.handleOpen);
          });
        }
      : () => {};

    runIfTriggersExist();
  }

  override template() {
    if (!this.getState().isOpen) return "";
    return /* html */ `
      <div class="modal" data-testid="modal">
        <div class="modal-backdrop" data-action="close-modal" data-testid="modal-backdrop"></div>
        <div id="modal-container" class="modal-container">
          ${this.contents()}
        </div>
      </div>
    `;
  }

  public open() {
    if (this.getState().isOpen) return;
    this.setState({ isOpen: true });
  }

  protected close() {
    if (!this.getState().isOpen) return;
    this.setState({ isOpen: false });
    this.$target.replaceChildren();
    this.destroy();
  }
}

export default Modal;
