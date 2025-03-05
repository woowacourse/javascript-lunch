import Component from "../../core/Component.js";

export default class BottomSheet extends Component {
  setDefaultProps() {
    this.props = {
      children: [],
      isOpen: false,
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

    const cancelButton = document.getElementById("cancel-button");
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        this.close();
      });
    }
  }

  template(isOpen = this.props.isOpen) {
    const { children } = this.props;

    if (!isOpen) {
      return "";
    }

    return `
     <div id="modal-open">
        <div 
          id="bottom-sheet-overlay"
          class="w-full h-full"
          style="
            position: fixed;
            top: 0;
            left: 0;                        
            background-color: rgba(0, 0, 0, 0.5);
          "
        />
        <div
          class="w-full flex justify-center" 
          style="
            position: fixed;
            bottom: 0;
            left: 0;
            height: 80%;      
            z-index: 50;
          "
        >
          <div 
            class="bottom-sheet-content max-w-390 w-full flex flex-col bg-white overflow-y"
            style="
              border-top-left-radius: 16px;
              border-top-right-radius: 16px;
              animation: slideUp 300ms ease-out forwards;
            "
          >
          <div
              class="w-40 bg-slate-50"
              style="
                height: 4px;
                border-radius: 2px;
                margin: 12px auto;
              "
            />
            <div class="w-full h-full flex flex-col justify-start items-center mx-16">
              ${children.map((child) => child.template()).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
