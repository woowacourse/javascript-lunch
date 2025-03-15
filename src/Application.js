import { Header, Restaurant, Modal, RestaurantList } from './components/index.js';
import Filter from './components/Filter.js';
import Component from './core/Component.js';
import { defaultRestaurantList } from './data/defaultRestaurantList.js';
import Sorter from './components/Sorter.js';

class Application extends Component {
  setup() {
    this.setState({
      restaurantList: defaultRestaurantList,
      category: '전체',
    });
  }

  template() {
    return `
      ${new Header({ title: '오늘 뭐 먹지' }).template()}
      <section class="restaurant-filter-container">
      ${new Sorter({
        name: 'sorting',
        optionList: ['이름순', '거리순'],
      }).template()}
      </section>
      ${new RestaurantList({
        restaurantList: this.state.restaurantList,
        category: this.state.category,
      }).template()}
    `;
  }

  addRestaurant(restaurant) {
    this.setState({
      ...this.state,
      restaurantList: [...this.state.restaurantList, restaurant],
    });
  }

  filterCategory(category) {
    this.setState({ ...this.state, category: category });
  }

  onRender() {
    const $restaurantFilterContainer = this.element.querySelector('.restaurant-filter-container');
    const categoryfilter = new Filter(
      {
        name: 'category',
        optionList: ['전체', '한식', '중식', '일식', '양식', '아시안', '기타'],
        filterCategory: this.filterCategory.bind(this),
      },
      this.element,
    );
    $restaurantFilterContainer.appendChild(categoryfilter.element);

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
