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
    const bottomSheetContainer = document.getElementById("bottom-sheet");
    bottomSheetContainer.innerHTML = this.template(true);

    this.addBottomSheetEvents();

    this.children.map((child) => {
      child.setProps({
        onAdd: this.props.onAdd,
      });
    });
  }

  close() {
    const bottomSheetContainer = document.getElementById("bottom-sheet");
    if (bottomSheetContainer) {
      bottomSheetContainer.innerHTML = "";
    }
  }

  addBottomSheetEvents() {
    const overlay = document.querySelector("#bottom-sheet-overlay");
    const bottomSheetContent = document.getElementById("bottom-sheet-content");
    overlay?.addEventListener(
      "click",
      (e) => !bottomSheetContent.contains(e.target) && this.close()
    );

    const cancelButton = document.getElementById("cancel-btn");
    cancelButton?.addEventListener("click", () => {
      this.close();
    });

    const lunchForm = document.getElementById("lunch-form");
    lunchForm?.addEventListener("submit", (e) => {
      this.children.map((child) => {
        try {
          child.handleSubmit(e);
          this.close();
        } catch (e) {
          alert(e.message);
        }
      });
    });
  }

  template(isOpen = this.props.isOpen) {
    if (!isOpen) return "";

    return `
      <div id="bottom-sheet-open">
        <div 
          id="bottom-sheet-overlay"
          class="w-full h-full fixed top-0 left-0"
          style="background-color: rgba(0, 0, 0, 0.5);"
        />
        <div
          class="w-full fixed flex justify-center bottom-0 left-0"
          style="height: 80%; z-index: 50;"
        >
          <div 
            id="bottom-sheet-content"
            class="relative max-w-390 w-full flex flex-col bg-white overflow-y px-16 box-border"
            style="z-index: 50; border-top-left-radius: 16px; border-top-right-radius: 16px; 
              animation: slideUp 300ms ease-out forwards;"
          >
            ${this.children.map((child) => child.template()).join("")}
          </div>
        </div>
      </div>
    `;
  }

  render(props) {
    super.render(props, "#bottom-sheet");
  }
}
