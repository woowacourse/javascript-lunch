import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";

export default class Text extends Component {
  setDefaultProps() {
    this.props = {
      content: "",
      classList: [],
      styles: {},
    };
  }

  template() {
    const { content, classList, styles } = this.props;
    return `
      <p 
        class="${classList.join(" ")}" 
        style="${styleStr(styles)}">
        ${content}
      </p>`;
  }
}
