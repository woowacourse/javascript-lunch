import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";

export default class Select extends Component {
  setDefaultProps() {
    this.props = {
      placeholder: "선택해주세요",
      options: [],
      onChange: () => {},
      dropDownClassList: [],
      selectClassList: [],
      id: "init",
    };
  }

  initState() {
    this.state = { isOpen: false, selected: "" };
  }

  selectOption(option) {
    this.setState({ selected: option, isOpen: false });
    this.props.onChange(option);
    this.render();
  }

  handleToggleButtonClick(e) {
    const button = e.target.closest(`#${this.props.id}-button`);
    if (button) {
      this.setState({ isOpen: !this.state.isOpen });
      return true;
    }
    return false;
  }

  handleDropdownOptionClick(e) {
    const option = e.target.closest(`#${this.props.id}-dropdown li`);
    if (option) {
      this.selectOption(option.dataset.value);
      return true;
    }
    return false;
  }

  handleOutsideClick(e) {
    const dropdown = document.querySelector(`#${this.props.id}-dropdown`);
    if (dropdown && !dropdown.contains(e.target)) {
      this.setState({ isOpen: false });
      return true;
    }
    return false;
  }

  setEvent() {
    document.removeEventListener("click", this.handleClickOutside);

    this.handleClickOutside = (e) => {
      if (this.handleToggleButtonClick(e)) return;
      if (this.handleDropdownOptionClick(e)) return;
      this.handleOutsideClick(e);
    };

    document.addEventListener("click", this.handleClickOutside);
  }

  createOptionItems() {
    return this.props.options
      .map(
        (option) =>
          `<li data-value="${option}" class="cursor-pointer py-16 px-8">${option}</li>`
      )
      .join("");
  }

  renderDropDownItem() {
    const { options, dropDownClassList, id } = this.props;
    if (!this.state.isOpen) return "";

    return `
      <ul 
        id="${id}-dropdown"
        class=" dropdown-shadow ${dropDownClassList.join(
          " "
        )} min-h-44 absolute w-full bg-white border rounded-lg mt-8 left-0 overflow-y"
        style="top: 100%; z-index: 100; list-style: none; max-height: 200px;"
        >
        ${this.createOptionItems()}
      </ul>
    `;
  }

  createButtonContent() {
    const { selected } = this.state;
    const { placeholder } = this.props;

    return `${selected ? selected : placeholder}
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" style="transition: transform 0.2s;">
        <path d="M5 8L10 13L15 8" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      </svg>`;
  }

  template() {
    const { id, selectClassList } = this.props;

    return `
      <div id="${this.props.id}" class="relative">
        <button type="button" id="${id}-button" class="${selectClassList.join(
      " "
    )} w-full h-44 flex items-center justify-between cursor-pointer border rounded-lg bg-white text-lg">
           ${this.createButtonContent()}
        </button>
        ${this.renderDropDownItem()} 
      </div>
    `;
  }

  updateButtonText(button) {
    const { selected } = this.state;
    const { placeholder } = this.props;

    const buttonTextNode = Array.from(button.childNodes).find(
      (node) => node.nodeType === Node.TEXT_NODE
    );
    if (buttonTextNode) {
      buttonTextNode.textContent = selected ? selected : placeholder;
    }
  }

  updateSvgRotation(button) {
    const svg = button.querySelector("svg");
    if (svg) {
      svg.style.transform = this.state.isOpen ? "rotate(180deg)" : "";
    }
  }

  updateDropdown(container) {
    const dropdownContainer = container.querySelector("ul");

    if (this.state.isOpen && dropdownContainer) {
      dropdownContainer.outerHTML = this.renderDropDownItem();
    }

    if (this.state.isOpen && !dropdownContainer) {
      container.insertAdjacentHTML("beforeend", this.renderDropDownItem());
    }

    if (!this.state.isOpen && dropdownContainer) {
      dropdownContainer.remove();
    }
  }

  render(props, targetElement = `#${this.props.id}`) {
    if (props) this.setProps(props);

    const container = document.querySelector(targetElement);
    const button = container.querySelector(`#${this.props.id}-button`);

    if (container.id === this.props.id && button) {
      this.updateButtonText(button);
      this.updateSvgRotation(button);
    }

    this.updateDropdown(container);
  }
}
