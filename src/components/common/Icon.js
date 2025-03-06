import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";

export default class Icon extends Component {
  setDefaultProps() {
    this.props = {
      iconName: "",
      size: "40",
      classList: [],
      styles: {},
      id: "init",
    };
  }

  template() {
    const { iconName, size, classList, styles, id } = this.props;
    return `
      <img
        id="${id}"
        width="${size}"
        height="${size}"
        alt="${iconName}"
        src="${iconName}.png"
        class=" ${classList.join(" ")} cursor-pointer" 
        style="${styleStr(styles)}" />
      `;
  }
}
