import "./styles/style.css";
import "./styles/Header.css";
import "../templates/add-button.png";
import "../templates/category-asian.png";
import "../templates/category-chinese.png";
import "../templates/category-etc.png";
import "../templates/category-japanese.png";
import "../templates/category-korean.png";
import "../templates/category-western.png";
import "../templates/favorite-icon-filled.png";
import "../templates/favorite-icon-lined.png";
import Component from "./common/Component";
import Header from "./components/Header";
import restaurantList from "./domain/RestaurantList";

export default class App extends Component {
  setup(): void {
    this.state = {
      filter: "all",
      restuarnt: restaurantList.getRestaurants({
        category: "전체",
        sortingStandard: "name",
      }),
    };
  }

  render() {
    return `
            <header class="gnb"></header>
            <main>
              <section class="restaurant-filter"></section>
              <section class="restaurant-select">

              </section>
              <section class="restaurant-list"></section>
            </main>
            <div class="modal"></div>
        `;
  }

  componentDidMount(): void {
    const $header = document.querySelector(".gnb");
    new Header($header);
  }
}
