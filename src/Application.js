import {
  Header,
  Restaurant,
  Modal,
  RestaurantList,
  RestaurantAddModal,
  InputBox,
  Button,
  RestaurantTab,
  RestaurantDetailModal,
} from './components/index.js';
import Component from './core/Component.js';
import { RESTAURANT_LIST_DEFAULT } from './lib/constants.js';

export default class Application extends Component {
  constructor() {
    super();

    this.setState({ restaurants: JSON.parse(localStorage.getItem('restaurants')) ?? [] });
    // this.setState({ restaurants: RESTAURANT_LIST_DEFAULT });
  }

  template() {
    return `
      ${new Header({ title: '오늘 뭐 먹지' }).template()}
      
    `;
  }

  componentDidMount() {
    this.#attachClickEventListener();
    this.#attachKeyDownEventListener();
  }

  onRender() {
    this.#appendRestaurantList();
    this.#appendRestaurantAddModal();
    this.#appendRestaurantDetailModal();
  }

  #appendRestaurantList() {
    this.element.appendChild(
      new RestaurantList({
        restaurants: this.state.restaurants,
      }).render(),
    );
  }

  #appendRestaurantAddModal() {
    const restaurantAddModal = new RestaurantAddModal({
      addRestaurant: this.#addRestaurant.bind(this),
    });
    this.element.appendChild(restaurantAddModal.render());
  }

  #appendRestaurantDetailModal() {
    this.element.appendChild(
      new RestaurantDetailModal({
        category: '한식',
        name: '피양콩할마니',
        distance: '캠퍼스부터 10분 내',
        description:
          "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, '피양'은 평안도 사투리로 '평양'을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.",
        isLike: true,
        url: 'https://naver.me/G6DyD9tg',
      }).render(),
    );
  }

  #addRestaurant(restaurant) {
    this.setState({
      ...this.state,
      restaurants: [...this.state.restaurants, restaurant],
    });

    localStorage.setItem('restaurants', JSON.stringify(this.state.restaurants));
  }

  #toggleLike(name) {
    const copied = [...this.state.restaurants];

    const currentRestaurantIndex = this.state.restaurants.findIndex((restaurant) => restaurant.name === name);
    const changedRestaurant = this.state.restaurants[currentRestaurantIndex];

    copied.splice(currentRestaurantIndex, 1, { ...changedRestaurant, isLike: !changedRestaurant.isLike });

    this.setState({
      ...this.state,
      restaurants: copied,
    });

    localStorage.setItem('restaurants', JSON.stringify(this.state.restaurants));
  }

  #attachClickEventListener() {
    window.addEventListener('click', (event) => {
      if (event.target.closest('.gnb__button'))
        this.element.querySelector('#restaurant-add-modal').classList.add('modal--open');
      if (event.target.closest('#modal-cancel') || event.target.closest('.modal-backdrop')) {
        this.element.querySelectorAll('.modal').forEach((modal) => {
          modal.classList.remove('modal--open');
        });
      }

      if (event.target.closest('#like__button')) this.#toggleLike(event.target.dataset.name);

      if (event.target.closest('.restaurant'))
        this.element.querySelector('#restaurant-detail-modal').classList.add('modal--open');
    });
  }

  #attachKeyDownEventListener() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.element.querySelectorAll('.modal').forEach((modal) => {
          modal.classList.remove('modal--open');
        });
      }
    });
  }
}
