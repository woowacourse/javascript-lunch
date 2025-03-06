import Component from "../../core/Component.js";
import LunchForm from "../feature/LunchForm.js";

export default class BottomSheet extends Component {
  setDefaultProps() {
    this.props = {
      isOpen: false,
      onAdd: () => {},
    };
  }

  initState() {
    this.state = {
      isOpen: this.props?.isOpen || false,
    };
  }

  open() {
    const modalContainer = document.getElementById("modal");
    modalContainer.innerHTML = this.template(true);

    this.addModalEvents();

    this.children.map((child) => {
      child.setProps({
        onAdd: this.props.onAdd,
      });
    });
  }

  close() {
    const modalContainer = document.getElementById("modal");
    if (modalContainer) {
      modalContainer.innerHTML = "";
    }
  }

  addModalEvents() {
    const overlay = document.querySelector("#bottom-sheet-overlay");
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          this.close();
        }
      });
    }

    const cancelButton = document.getElementById("cancelBtn");
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        this.close();
      });
    }

    const submitButton = document.getElementById("submitBtn");
    if (submitButton) {
      submitButton.addEventListener("click", () => {
        this.children.map((child) => {
          child.handleSubmit();
          this.close();
        });
      });
    }
  }

  template(isOpen = this.props.isOpen) {
    if (!isOpen) return "";

    return `
      <div id="modal-open">
        <div 
          id="bottom-sheet-overlay"
          class="w-full h-full"
          style="position: fixed; top: 0; left: 0; background-color: rgba(0, 0, 0, 0.5);"
        />
        <div
          class="w-full flex justify-center"
          style="position: fixed; bottom: 0; left: 0; height: 80%; z-index: 50;"
        >
          <div 
            id="bottom-sheet-content"
            class="relative max-w-390 w-full flex flex-col bg-white overflow-y px-16 box-border"
            style="z-index: 50; border-top-left-radius: 16px; border-top-right-radius: 16px; animation: slideUp 300ms ease-out forwards;"
          >
            ${this.children.map((child) => child.template()).join("")}
          </div>
        </div>
      </div>
    `;
  }

  render(props) {
    super.render(props, "#modal");
  }
}
