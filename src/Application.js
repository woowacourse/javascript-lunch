import { Header, Restaurant, Modal, RestaurantList } from './components/index.js';
import Filter from './components/Filter.js';
import Component from './core/Component.js';
import { defaultRestaurantList } from './data/defaultRestaurantList.js';

class Application extends Component {
  setup() {
    this.setState({ restaurantList: defaultRestaurantList });
  }

  template() {
    return `
      ${new Header({ title: '오늘 뭐 먹지' }).template()}
      <section class="restaurant-filter-container">
       ${new Filter({
         name: 'category',
         optionList: ['전체', '한식', '중식', '일식', '양식', '아시안', '기타'],
       }).template()}
       ${new Filter({
         name: 'sorting',
         optionList: ['이름순', '거리순'],
       }).template()}
      </section>
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
        modalTitle: '새로운 음식점',
        addRestaurant: this.addRestaurant.bind(this),
      },
      this.element,
    );
    this.element.appendChild(modal.element);
  }
}

export default Application;
