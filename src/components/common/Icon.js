import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";

export default class Icon extends Component {
  setDefaultProps() {
    this.props = {
      size: "40",
      iconName: "",
      classList: [],
      styles: {},
      id: "init",
    };
  }

  template() {
    const { size, iconName, classList, styles, id } = this.props;
    return `
      <img
        id="${id}"
        width="${size}"
        height="${size}"
        alt="${iconName}"
        src="${iconName}.png"
        class=" ${classList.join(" ")} cursor-pointer" 
        style="${styleStr(styles)}"
      />
      `;
  }
}
