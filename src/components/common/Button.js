import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";

const primary = ["bg-primary-500", "white"];
const secondary = ["bg-white", "slate-400", "border", "border-slate-400"];
export default class Button extends Component {
  setDefaultProps() {
    this.props = {
      text: "",
      variant: "primary",
      disabled: false,
      onClick: () => {},
      styles: {},
      id: "init",
    };
  }

  setEvent() {
    const { onClick, id } = this.props;
    const buttonContainer = document.querySelector(`#${id}`);
    if (buttonContainer) {
      buttonContainer.addEventListener("click", (e) => {
        e.preventDefault();
        onClick(e);
      });
    }
  }

  template() {
    const { text, variant, disabled, styles, id } = this.props;
    return `
      <button 
        type="submit"
        id="${id}"  
        class="${
          variant === "primary" ? primary.join(" ") : secondary.join(" ")
        } w-full h-44 flex justify-center items-center text-lg rounded-lg" ${
      disabled && "disabled"
    } 
      style="${styleStr(styles)}  ">
      ${text}
    </button>
    `;
  }
}
