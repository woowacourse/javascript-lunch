import Component from "./common/Component";
import Header from "./components/Header";
import restaurantList from "./domain/RestaurantList";
import Restaurants from "./components/Restuarants";
import Filter from "./components/Filter";
import { RestaurantType } from "./types";

export default class App extends Component {
  setup(): void {
    this.state = {
      filter: "all",
      restaurants: [
        {
          category: "한식",
          name: "한식집1",
          distance: 20,
          bookmark: true,
          description: "",
          link: "",
        },
        {
          category: "한식",
          name: "한식집1",
          distance: 20,
          bookmark: false,
          description: "",
          link: "",
        },
      ],
      // restuarnts: restaurantList.getRestaurants({
      //   category: "전체",
      //   sortingStandard: "name",
      // }),
    };
  }

  render() {
    return /*html*/ `
            <header class="gnb"></header>
            <main>
              <section class="filter-container"></section>
              <section class="restaurant-select">

              </section>
              <section class="restaurants"></section>
            </main>
            <div class="modal">
              <div class="modal-backdrop"></div>
              <div class="modal-container"></div>
            </div>
        `;
  }

  componentDidMount(): void {
    const $header = document.querySelector(".gnb");
    const $restaurants = document.querySelector(".restaurants");
    const $filter = document.querySelector(".filter-container");
    new Header($header, { addRestaurant: this.addRestaurant.bind(this) });
    new Restaurants($restaurants, { restaurants: this.state.restaurants });
    new Filter($filter, { filter: this.state.filter });
  }

  // changeFilter(filter: string) {
  //   if (filter === 'all') {
  //     this.setState({
  //       filter: 'all',
  //       restaurants: this.state.restaurants.filter((restaurant) => restaurant.bookmark === '')
  //     })
  //   } else if (filter === 'bookmark') {

  //   }
  // }

  addRestaurant(newRestaurant: Restaurants) {
    this.setState({
      filter: this.state.filter,
      restaurants: [newRestaurant, ...this.state.restaurants],
    });
  }
}
