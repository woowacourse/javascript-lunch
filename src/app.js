import Component from "./core/Component";
import Header from "./components/Header";
import Filter from "./components/Filter";
import RestaurantList from "./components/RestaurantList";
import Modal from "./components/Modal";

export default class App extends Component {
  setup() {
    this.state = {
      restaurantList: [
        {
          name: "가식당",
          category: "한식",
          distance: 5,
          description: "가식당입니다.",
        },
        {
          name: "나식당",
          category: "일식",
          distance: 10,
          description: "나식당입니다.",
        },
        {
          name: "다식당",
          category: "아시안",
          distance: 20,
          description: "다식당입니다.",
        },
      ],
      modalToggle: false,
    };
  }

  template() {
    return `
      <header class="gnb"></header>
      <main></main>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector(".gnb");
    const $main = this.$target.querySelector("main");

    const restaurantList = this.state.restaurantList;

    new Header($header);
    new Filter($main);
    new RestaurantList($main, { restaurantList });
    new Modal($main);
  }
}
