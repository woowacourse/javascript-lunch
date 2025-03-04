import Component from "../../core/Component.js";
import { styleStr } from "../../utils/styleStr.js";
import Icon from "./Icon.js";

export default class CircleIcon extends Component {
  setDefaultProps() {
    this.props = {
      iconName: "",
      classList: [],
      styles: {},
    };
  }

  renderIcon() {
    const icon = new Icon();
    icon.setProps({
      iconName: this.props.iconName,
    });
    return icon.template();
  }

  template() {
    const { iconName, classList, styles } = this.props;
    return `
      <span class="w-64 h-64 flex justify-center items-center rounded-full bg-primary-300">
        ${this.renderIcon()}
      </span>
      `;
  }
}
