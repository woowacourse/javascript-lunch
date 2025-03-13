import {
  Header,
  Restaurant,
  Modal,
  RestaurantList,
} from "./components/index.js";
import Component from "./core/Component.js";
import { defaultRestaurantList } from "./data/defaultRestaurantList.js";

class Application extends Component {
  constructor() {
    super();
  }

  setup() {
    this.setState({ restaurantList: defaultRestaurantList });
  }

  template() {
    return `
      ${new Header({ title: "오늘 뭐 먹지" }).template()}
      ${new RestaurantList({
        restaurantList: this.state.restaurantList,
      }).template()}
    `;
  }

  addRestaurant(restaurant) {
    this.setState({
      ...this.state,
      restaurantList: [...this.state.restaurantList, restaurant],
    });
  }

  onRender() {
    const modal = new Modal(
      {
        modalTitle: "새로운 음식점",
        addRestaurant: this.addRestaurant.bind(this),
      },
      this.element
    );
    this.element.appendChild(modal.element);
  }
}

export default Application;
