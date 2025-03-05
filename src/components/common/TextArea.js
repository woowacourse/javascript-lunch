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
    const { onChange, id } = this.props;
    const textAreaContainer = document.querySelector(`#${id}`);
    textAreaContainer.addEventListener("input", (e) => {
      e.preventDefault();
      onInput(e);
    });
  }

  template() {
    const { placeHolder, maxLength, rows, classList, styles, id } = this.props;
    return `
      <textarea 
        id="${id}"  
        name="${id}"
        autofocus
        placeHolder="${placeHolder}">
        rows="${rows}"
        maxlength="${maxLength}"
        class="${classList.join(" ")} w-full border border-slate-400 px-8 py-8"
        style="${styleStr(styles)}"
      >
      </textarea>
    `;
  }
}
