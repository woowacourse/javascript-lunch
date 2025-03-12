import Component from "../../core/Component.js";
import { match } from "../../utils/match.js";
import CircleIcon from "../common/CircleIcon.js";
import Icon from "../common/Icon.js";
import Text from "../common/Text.js";

export default class LunchItem extends Component {
  setDefaultProps() {
    this.props = {
      storeName: "",
      location: "",
      category: "",
      description: "",
      reference: "",
    };
  }

  renderStoreName() {
    const storeName = this.addChild(Text);

    storeName.setProps({
      content: this.props.storeName,
      classList: ["text-xl"],
      id: "store-name-item",
    });

    return storeName.template();
  }

  renderLocation() {
    const location = this.addChild(Text);
    location.setProps({
      content: this.props.location,
      classList: ["text-lg", "primary-500"],
      id: "location-item",
    });

    return location.template();
  }

  renderDescription() {
    if (!this.props.description) return "";
    const description = this.addChild(Text);
    description.setProps({
      content: this.props.description,
      classList: ["text-lg", "my-8"],
      styles: {
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
      },
      id: "description-item",
    });

    return description.template();
  }

  renderCircleIcon() {
    const icon = this.addChild(CircleIcon);
    icon.setProps({
      iconName: match(this.props.category),
      id: "category-item",
    });

    return icon.template();
  }

  template() {
    return `
      <div id="lunch-item" class="flex flex-row w-full items-start gap-16 py-16 px-8 border-b" style="height: auto;">
        <div>
          ${this.renderCircleIcon()}
        </div>
        <div class="flex flex-col overflow-hidden" style="width: 262px;">
          ${this.renderStoreName()}
          ${this.renderLocation()}
          ${this.renderDescription()}
        </div>
      </div>
    `;
  }
}
