import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";

const primary = ["bg-primary-500", "white", "border-none"];
const secondary = ["bg-white", "slate-400", "border", "border-slate-400"];
export default class Button extends Component {
  setDefaultProps() {
    this.props = {
      text: "",
      variant: "primary",
      disabled: false,
      onClick: () => {},
      styles: {},
      id: "",
    };
  }

  setEvent() {
    if (!this.props) return;

    document.addEventListener("click", (e) => {
      if (e.target.closest(`#${this.props.id}`)) {
        this.props.onClick();
      }
    });
  }

  template() {
    const { text, variant, disabled, styles, id } = this.props;
    return `
      <button 
        id="${id}"  
        type="submit"
        ${disabled && "disabled"} 
        class="${
          variant === "primary" ? primary.join(" ") : secondary.join(" ")
        } w-full h-44 flex justify-center items-center text-lg rounded-lg cursor-pointer"
        style="${styleStr(styles)}"
      >
        ${text}
      </button>
    `;
  }
}
