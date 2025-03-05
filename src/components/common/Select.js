import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";
import Icon from "./Icon.js";

export default class Select extends Component {
  setDefaultProps() {
    this.props = {
      options: [],
      classList: [],
      styles: {},
      id: "init",
    };
  }

  initState() {
    this.state = {
      isOpen: false,
    };
  }

  toggleSelect() {
    document.addEventListener("click", (e) => {
      if (e.target.id === "select-open") {
        this.setState({ isOpen: !this.state.isOpen });
        return;
      }
      this.setState({ isOpen: false });
    });
  }

  template() {
    const { options, classList, styles, id } = this.props;
    const { isOpen } = this.state;

    return `
    <div class="w-full flex">
      <button id="select-open" class="w-full flex">
        선택해주세요
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="${isOpen && "transform: rotate(90deg);"}"
        >
          <path
            d="M5 8L10 13L15 8"
            stroke="#667085"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      ${
        this.state.isOpen &&
        `
        <div class="relative w-full">
          <ul 
            id="${id}" 
            name="${id}"
            class="${classList.join(" ")}
              absolute w-full flex items-center pl-8 rounded-lg border" 
            style="${styleStr(styles)}"
          >
            ${options
              .map(
                (option) =>
                  `<li value="${option}" class="cursor-pointer">${option}</li>`
              )
              .join("")}
        </ul>
      </div>`
      }

    </div>
    `;
  }
}
