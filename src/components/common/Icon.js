import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";

export default class Icon extends Component {
  setDefaultProps() {
    this.props = {
      iconName: "",
      classList: [],
      styles: {},
      id: "init",
    };
  }

  template() {
    const { iconName, classList, styles, id } = this.props;
    return `
      <img
        id="${id}"
        width="40"
        height="40"
        alt="${iconName}"
        src="${iconName}.png"
        class=" ${classList.join(" ")} cursor-pointer" 
        style="${styleStr(styles)}" />
      `;
  }
}
