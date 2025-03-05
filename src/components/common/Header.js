import Component from "../../core/Component.js";
import Icon from "./Icon.js";
import Text from "./Text.js";

export default class Header extends Component {
  setDefaultProps() {
    this.props = {
      title: "",
      iconName: "",
      onIconClick: () => {},
    };
  }

  renderText() {
    const text = new Text();
    text.setProps({ content: this.props.title, classList: ["text-2xl"] });
    return text.template();
  }

  renderIcon() {
    const icon = new Icon();
    icon.setProps({
      iconName: this.props.iconName,
      id: "header-icon",
    });
    return icon.template();
  }

  setEvent() {
    document.addEventListener("click", (event) => {
      const headerIcon = document.querySelector("#header-icon");
      if (headerIcon && headerIcon === event.target) {
        this.props.onIconClick();
      }
    });
  }

  template() {
    return `
    <header class="w-full h-64 flex justify-between items-center bg-primary-500 white px-16 box-border">
      ${this.renderText()}
      ${this.renderIcon()}
    </header>
    `;
  }
}
