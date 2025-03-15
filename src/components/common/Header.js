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
    const text = this.addChild(Text);
    text.setProps({
      content: this.props.title,
      classList: ["text-2xl cursor-pointer"],
      id: "header-text",
    });

    return text.template();
  }

  renderIcon() {
    const icon = this.addChild(Icon);
    icon.setProps({
      iconName: this.props.iconName,
      id: "header-icon",
    });
    return icon.template();
  }

  setEvent() {
    document.removeEventListener("click", this.handleClick);
    this.handleClick = (event) => {
      const headerIcon = document.querySelector("#header-icon");
      const titleText = document.querySelector("#header-text");

      if (headerIcon === event.target) {
        this.props.onIconClick();
      }

      if (titleText === event.target) {
        location.reload();
      }
    };
    document.addEventListener("click", this.handleClick);
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
