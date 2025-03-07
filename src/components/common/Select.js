import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";

export default class Select extends Component {
  setDefaultProps() {
    this.props = {
      options: [],
      onChange: () => {},
      classList: [],
      styles: {},
      id: "init",
    };
  }

  initState() {
    this.state = { isOpen: false, selected: "" };
  }

  setState(newState) {
    const { id } = this.props;
    this.state = { ...this.state, ...newState };

    const bottomSheetContent = document.getElementById("bottom-sheet-content");
    const bottomSheetButton = bottomSheetContent.querySelector(`#${id}-button`);
    const container = bottomSheetButton.closest(".relative");

    container.querySelector(`#${id}-dropdown`)?.remove();

    bottomSheetButton.innerHTML = `
      ${this.state.selected || "선택해주세요"}
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" style="transition: transform 0.2s; ${
        this.state.isOpen ? "transform: rotate(180deg);" : ""
      }">
        <path d="M5 8L10 13L15 8" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;

    if (this.state.isOpen)
      container.insertAdjacentHTML("beforeend", this.renderDropDownItem());
  }

  toggleDropdown() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  selectOption(option) {
    this.setState({ selected: option, isOpen: false });
    this.props.onChange(option);
  }

  setEvent() {
    document.addEventListener("click", (e) => {
      if (e.target.id === `${this.props.id}-button`) {
        return this.toggleDropdown();
      }

      const option = e.target.closest(`#${this.props.id}-dropdown li`);
      if (option) {
        this.selectOption(option.dataset.value);
      }
    });
  }

  renderDropDownItem() {
    const { options, classList, styles, id } = this.props;
    if (!this.state.isOpen) return "";

    return `
      <ul 
        id="${id}-dropdown"
        class=" dropdown-shadow ${classList.join(
          " "
        )} min-h-44 absolute w-full bg-white border rounded-lg mt-8 left-0 overflow-y"
        style="top: 100%; z-index: 100; list-style: none; max-height: 200px;
         ${styleStr(styles)}"
        >
        ${options
          .map(
            (option) =>
              `<li data-value="${option}" class="cursor-pointer py-16 px-8">${option}</li>`
          )
          .join("")}
      </ul>
    `;
  }

  template() {
    const { id } = this.props;
    const { isOpen, selected } = this.state;

    return `
      <div class="relative w-full flex flex-col">
        <button id="${id}-button" class="w-full h-44 flex items-center justify-between cursor-pointer border rounded-lg bg-white text-lg">
          ${selected || "선택해주세요"}
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" style="transition: transform 0.2s; ${
            isOpen ? "transform: rotate(180deg);" : ""
          }">
            <path d="M5 8L10 13L15 8" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        ${this.renderDropDownItem()} 
      </div>
    `;
  }
}
