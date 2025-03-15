import Component from "../../core/Component.js";
import CircleIcon from "../common/CircleIcon.js";
import Text from "../common/Text.js";
import LunchItem from "./LunchItem.js";

const LUNCH_LIST_TYPE = {
  ALL: "ALL",
  FAVORITES: "FAVORITES",
};

export default class LunchList extends Component {
  setDefaultProps() {
    this.props = {
      type: LUNCH_LIST_TYPE.ALL,
      items: [],
      onItemClick: () => {},
    };
  }

  initState() {
    this.state = {
      items: this.filterItemsByType(this.props.items, this.props.type),
    };
  }

  filterItemsByType(items, type) {
    if (!items) return [];
    return type === LUNCH_LIST_TYPE.ALL
      ? items
      : items.filter((item) => item.isFavorite);
  }

  setProps(newProps) {
    super.setProps(newProps);
    if (newProps.items) {
      this.setState({
        items: this.filterItemsByType(
          newProps.items,
          newProps.type || this.props.type
        ),
      });
    }
  }

  renderLunchItem(item) {
    const lunchItem = this.addChild(LunchItem, {
      ...item,
      onClick: () => this.props.onItemClick(item),
    });
    return lunchItem;
  }

  renderItems() {
    return this.state.items
      .map((item) => this.renderLunchItem(item).template())
      .join("");
  }

  renderText() {
    const text = this.addChild(Text, {
      content:
        this.props.type === LUNCH_LIST_TYPE.FAVORITES
          ? "즐겨찾기한 음식점이 없습니다."
          : "아직 추가된 음식점이 없습니다.",
      classList: ["text-lg", "text-slate-500"],
    });
    return text.template();
  }

  renderCircleIcon() {
    const icon = this.addChild(CircleIcon, {
      iconName: "category-korean",
    });
    return icon.template();
  }

  template() {
    const { items } = this.state;
    const isEmpty = !items || items.length === 0;

    return `
      <section id="lunch-list-container" class="w-full flex flex-col justify-center items-center my-4">
        <ul id="restaurant-list" class="w-full">
          ${
            isEmpty
              ? `<div class="flex flex-col items-center justify-center gap-16 mt-32 py-8">
                ${this.renderCircleIcon()}
                ${this.renderText()}
              </div>`
              : this.renderItems()
          }
        </ul>
      </section>
    `;
  }

  render(props, targetElement = "#lunch-list-container") {
    if (props) this.setProps(props);
  }
}
