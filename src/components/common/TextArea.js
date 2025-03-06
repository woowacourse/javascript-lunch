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
    };
  }

  setEvent() {
    if (!this.props) return;
    document.addEventListener("input", (e) => {
      if (e.target.id === this.props.id) {
        this.props.onInput(e.target.value);
      }
    });
  }

  template() {
    const { rows, maxLength, placeHolder, classList, styles, id } = this.props;

    return `
      <textarea 
        autofocus
        id="${id}"  
        name="${id}"
        rows="${rows}"
        maxlength="${maxLength}"
        placeholder="${placeHolder}"
        class="${classList.join(
          " "
        )} w-full border border-slate-50 px-8 py-8 box-border text-lg"
        style="${styleStr(styles)}"
      ></textarea>
    `;
  }
}
