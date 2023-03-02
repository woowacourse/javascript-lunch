import Component from "./core/Component";

export default class App extends Component {
  setup() {
    this.state = {
      restaurantList: [],
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
  }
}
