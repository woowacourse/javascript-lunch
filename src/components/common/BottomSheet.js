import Component from "../../core/Component.js";
import LunchItemDetail from "../feature/LunchItemDetail.js";
import LunchForm from "../feature/LunchForm.js";

export const BOTTOM_SHEET_MODES = {
  FORM: "FORM",
  DETAIL: "DETAIL",
};

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
      mode: BOTTOM_SHEET_MODES.FORM,
      selectedItem: null,
    };
  }

  open(mode, selectedItem = null) {
    this.setState({
      isOpen: true,
      mode,
      selectedItem,
    });

    this.children = [
      this.addChild(
        mode === BOTTOM_SHEET_MODES.FORM ? LunchForm : LunchItemDetail,
        selectedItem
      ),
    ];
    this.render();
    this.setEvent();
  }

  close() {
    const bottomSheetContainer = document.getElementById("bottom-sheet");
    if (bottomSheetContainer) {
      bottomSheetContainer.innerHTML = "";
    }
  }

  findChildByType(type) {
    return this.children.find((child) => child instanceof type);
  }

  handleOverlayClickEvent() {
    const overlay = document.querySelector("#bottom-sheet-overlay");
    const bottomSheetContent = document.getElementById("bottom-sheet-content");

    overlay?.addEventListener("click", (e) => {
      if (!bottomSheetContent.contains(e.target)) {
        this.close();
      }
    });
  }

  handleCancelButtonClickEvent() {
    const cancelButton = document.getElementById("cancel-btn");
    cancelButton?.addEventListener("click", () => {
      this.close();
    });
  }

  handleFormSubmitEvent() {
    const lunchForm = document.getElementById("lunch-form");
    lunchForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit(e);
    });
  }

  handleDeleteButtonClickEvent() {
    const lunchItemDetail = document.getElementById("delete-btn");
    lunchItemDetail?.addEventListener("click", (e) => {
      e.preventDefault();
      this.handleDeleteItem(e);
    });
  }

  handleDeleteItem(e) {
    const lunchItemDetail = this.findChildByType(LunchItemDetail);
    lunchItemDetail.handleDeleteItem(e);
    this.close();
    document.dispatchEvent(new CustomEvent("itemChange"));
  }

  handleFormSubmit(e) {
    const lunchForm = this.findChildByType(LunchForm);

    try {
      lunchForm.handleSubmit(e);
      this.props.onAdd();
      this.close();
    } catch (e) {
      alert(e.message);
    }

    document.dispatchEvent(new CustomEvent("itemChange"));
  }

  setEvent() {
    this.handleOverlayClickEvent();
    this.handleCancelButtonClickEvent();
    this.handleFormSubmitEvent();
    this.handleDeleteButtonClickEvent();
  }

  template(isOpen = this.props.isOpen) {
    if (!isOpen) return "";

    const height = this.state.mode === "DETAIL" ? "auto" : "80%";

    return `
      <div id="bottom-sheet-open">
        <div 
          id="bottom-sheet-overlay"
          class="w-full h-full fixed top-0 left-0"
          style="background-color: rgba(0, 0, 0, 0.5);"
        />
        <div
          class="w-full fixed flex justify-center bottom-0 left-0"
          style="height: ${height}%; z-index: 50;"
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
