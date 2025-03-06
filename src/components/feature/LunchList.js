import Component from "../../core/Component.js";
import CircleIcon from "../common/CircleIcon.js";
import LunchItem from "./LunchItem.js";

export default class LunchList extends Component {
  initState() {
    this.state = {
      items: [],
    };
  }

  setProps(newProps) {
    if (newProps.lunchList) {
      this.setState({
        items: newProps.lunchList,
      });
    }
  }

  addLunchItem(newItem) {
    this.setState({
      items: [...this.state.items, newItem],
    });

    const restaurantList = document.getElementById("restaurant-list");
    if (restaurantList) {
      restaurantList.innerHTML = this.renderItems();
    }
  }

  renderItems() {
    return this.state.items
      .map((item) => {
        return item.template();
      })
      .join("");
  }

  renderCircleIcon() {
    const icon = this.addChild(CircleIcon);
    icon.setProps({
      iconName: "category-korean",
    });
    return icon.template();
  }

  template() {
    return `
      <section class="max-h-800 w-full h-full flex flex-col justify-start items-center my-16 overflow-y">
        <ul id="restaurant-list">
          <div class="h-140 flex flex-col items-center justify-center gap-16 mt-32">
            ${this.renderCircleIcon()}
            <p class="text-xl">아직 추가된 음식점이 없습니다.</p>
          </div>
        </ul>
      </section>
    `;
  }

  render(props) {}
}
