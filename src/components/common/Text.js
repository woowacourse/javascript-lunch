import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";

export default class Text extends Component {
  setDefaultProps() {
    this.props = {
      content: "",
      classList: [],
      styles: {},
      id: "init",
    };
  }

  template() {
    const { content, classList, styles, id } = this.props;
    return `
      <p
        id="${id}"
        class="${classList.join(" ")}" 
        style="${styleStr(styles)}">
        ${content}
      </p>`;
  }
}
