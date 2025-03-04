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
        src="${iconName}.png"
        class=" ${classList.join(" ")}" 
        style="${styleStr(styles)}" />
      `;
  }
}
