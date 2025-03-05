import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";

const primary = ["bg-primary-500", "white"];
const secondary = ["bg-white", "slate-400", "border", "border-slate-400"];
export default class Button extends Component {
  setDefaultProps() {
    this.props = {
      text: "",
      type: "",
      disabled: false,
      onClick: () => {},
      styles: {},
      id: "init",
    };
  }

  setEvent() {
    const { onClick, id } = this.props;
    const buttonContainer = document.querySelector(`#${id}`);
    buttonContainer.addEventListener("click", (e) => {
      e.preventDefault();
      onClick(e);
    });
  }

  template() {
    const { text, type, disabled, styles, id } = this.props;
    return `
      <button 
        type="submit"
        id="${id}"  
        class="${
          type === primary ? primary.join(" ") : secondary.join(" ")
        } w-full flex justify-center items-center text-lg" ${
      disabled && "disabled"
    } 
      style="${styleStr(styles)}">
      ${text}
    </button>
    `;
  }
}
