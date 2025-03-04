import Component from "../../core/Component";
import { styleStr } from "../../utils/styleStr";

export default class Icon extends Component {
  setDefaultProps() {
    this.props = {
      iconName: "",
      classList: [],
      styles: {},
    };
  }

  template() {
    const { iconName, classList, styles } = this.props;
    return `
      <img
        width="40"
        height="40"
        alt="${iconName}"
        src="${iconName}.png"
        class=" ${classList.join(" ")} cursor-pointer" 
        style="${styleStr(styles)}" />
      `;
  }
}
