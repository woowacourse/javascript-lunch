import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";

export default class TextArea extends Component {
  setDefaultProps() {
    this.props = {
      rows: 1,
      maxLength: 10,
      placeHolder: "",
      onInput: () => {},
      classList: [],
      styles: {},
      id: "init",
      isRequired: false,
    };
  }

  setEvent() {
    if (!this.props) return;

    document.removeEventListener("input", this.handleInput);
    this.handleInput = (e) => {
      if (e.target.id === this.props.id) {
        this.props.onInput(e.target.value);
      }
    };
    document.addEventListener("input", this.handleInput);
  }

  template() {
    const { isRequired, rows, maxLength, placeHolder, classList, styles, id } =
      this.props;

    return `
      <textarea 
        ${isRequired && "required"}
        autofocus
        id="${id}"
        name="${id}"
        rows="${rows}"
        maxlength="${maxLength}"
        placeholder="${placeHolder}"
        class="${classList.join(
          " "
        )} w-full border px-8 py-8 box-border text-lg"
        style="${styleStr(styles)}"
      ></textarea>
    `;
  }
}
