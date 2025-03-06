import Component from "../../core/Component.js";
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

  template() {
    return `
      <section class="w-full h-full flex flex-col justify-center items-center my-16 overflow-y">
        <ul id="restaurant-list">
          <p class="text-xl">아직 추가된 음식점이 없습니다.</p>
        </ul>
      </section>
    `;
  }

  render(props) {}
}
