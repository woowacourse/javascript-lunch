import Component from "../../core/Component.js";
import LunchItem from "./LunchItem.js";

export default class LunchList extends Component {
  setDefaultProps() {
    this.props = {
      lunchList: [],
    };
  }

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

  // addLunchItem(lunchItemData) {
  //   const newLunchItem = new LunchItem();
  //   newLunchItem.setProps(lunchItemData);

  //   this.setState({
  //     items: [...this.state.items, newLunchItem],
  //   });
  // }

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
        ${
          this.state.items.length >= 1
            ? this.renderItems()
            : '<p class="text-xl">아직 추가된 음식점이 없습니다.</p>'
        }
        </ul>
      </section>
    `;
  }
}
