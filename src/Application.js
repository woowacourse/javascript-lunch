import { Header, Restaurant, InputModal, RestaurantList } from './components/index.js';
import Filter from './components/Filter.js';
import Component from './core/Component.js';
import { defaultRestaurantList } from './data/defaultRestaurantList.ts';
import Modal from './components/Modal.js';

class Application extends Component {
  setup() {
    const storedRestaurants = localStorage.getItem('restaurantList');
    this.setState({
      restaurantList: storedRestaurants ? JSON.parse(storedRestaurants) : defaultRestaurantList,
      category: '전체',
      sort: '이름순',
    });
  }

  template() {
    return `
        <div id="app-header"></div>
        <section class="restaurant-filter-container"></section>
        <section class="restaurant-list-container"></section>
    `;
  }

  addRestaurant(restaurant) {
    const newRestaurantList = [...this.state.restaurantList, restaurant];
    this.setState({
      ...this.state,
      restaurantList: newRestaurantList,
    });
    localStorage.setItem('restaurantList', JSON.stringify(newRestaurantList));
  }

  deleteRestaurant(id) {
    const updatedList = this.state.restaurantList.filter((restaurant) => restaurant.id !== id);
    this.setState({ ...this.state, restaurantList: updatedList });
    localStorage.setItem('restaurantList', JSON.stringify(updatedList));
  }

  filterCategory(category) {
    this.setState({ ...this.state, category });
  }

  sortList(list) {
    this.setState({ ...this.state, sort: list });
  }

  addFavorite(restaurantId) {
    const updatedList = this.state.restaurantList.map((r) =>
      r.id === Number(restaurantId) ? { ...r, favorite: true } : r,
    );
    this.setState({ ...this.state, restaurantList: updatedList });
    localStorage.setItem('restaurantList', JSON.stringify(updatedList));
  }

  removeFavorite(restaurantId) {
    const updatedList = this.state.restaurantList.map((r) =>
      r.id === Number(restaurantId) ? { ...r, favorite: false } : r,
    );
    this.setState({ ...this.state, restaurantList: updatedList });
    localStorage.setItem('restaurantList', JSON.stringify(updatedList));
  }

  onRender() {
    const $headerContainer = this.element.querySelector('#app-header');
    const headerInstance = new Header({ title: '점심 뭐 먹지' }, this.element);
    $headerContainer.appendChild(headerInstance.element);
    headerInstance.onRender();

    const $restaurantListContainer = this.element.querySelector('.restaurant-list-container');
    const restaurantList = new RestaurantList({
      restaurantList: this.state.restaurantList,
      category: this.state.category,
      sort: this.state.sort,
      deleteRestaurant: this.deleteRestaurant.bind(this),
      addFavorite: this.addFavorite.bind(this),
      removeFavorite: this.removeFavorite.bind(this),
    });
    $restaurantListContainer.appendChild(restaurantList.element);

    const $restaurantFilterContainer = this.element.querySelector('.restaurant-filter-container');
    const categoryfilter = new Filter(
      {
        name: 'category',
        optionList: ['전체', '한식', '중식', '일식', '양식', '아시안', '기타'],
        filter: this.filterCategory.bind(this),
        standard: this.state.category,
      },
      this.element,
    );
    $restaurantFilterContainer.appendChild(categoryfilter.element);

    const listSorter = new Filter(
      {
        name: 'sorting',
        optionList: ['이름순', '거리순'],
        filter: this.sortList.bind(this),
        standard: this.state.sort,
      },
      this.element,
    );
    $restaurantFilterContainer.appendChild(listSorter.element);

    const inputModal = new InputModal(
      {
        modalTitle: '새로운 음식점',
        addRestaurant: this.addRestaurant.bind(this),
      },
      this.element,
    );
    this.element.appendChild(inputModal.element);
  }
}

export default Application;
