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
    <div class="relative w-full h-44 flex">
      <button id="select-open" class="w-full flex items-center justify-between cursor-pointer border rounded-lg slate-400 bg-white text-lg">
        선택해주세요
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="transition: transform 0.2s; ${
            isOpen ? "transform: rotate(180deg);" : ""
          }"
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
      isOpen
        ? `
        <ul 
          id="${id}" 
          class="${classList.join(
            " "
          )} absolute w-full bg-white border rounded-lg"
          style="${styleStr(styles)}"
        >
          ${options
            .map(
              (option) =>
                `<li value="${option}" class="cursor-pointer">${option}</li>`
            )
            .join("")}
        </ul>`
        : ""
    }
    </div>
    `;
  }
}
