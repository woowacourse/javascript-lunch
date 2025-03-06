import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";

export default class Text extends Component {
  setDefaultProps() {
    this.props = {
      content: "",
      required: false,
      classList: [],
      styles: {},
      id: "init",
    };
  }

  template() {
    const { content, required, classList, styles, id } = this.props;
    return `
      <p
        id="${id}"
        class="${classList.join(" ")}" 
        style="${styleStr(styles)}">
          ${content} ${required ? `<span style="color: red;">*</span>` : ""}
      </p>`;
  }
}
