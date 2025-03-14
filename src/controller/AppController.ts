import ActionButton from '../components/button/ActionButton';
import CTAButton from '../components/button/CTAButton';
import PlusButton from '../components/button/PlusButton';
import RestaurantFilterContainer from '../components/filter/RestaurantFilterContainer';
import Header from '../components/Header';
import RestaurantAddModalContent from '../components/modal/RestaurantAddModalContent';
import RestaurantDetailInfo from '../components/modal/RestaurantDetailInfo';
import RestaurantItem from '../components/restaurant/RestaurantItem';
import RestaurantList from '../components/restaurant/RestaurantList';
import RestaurantListContainer from '../components/restaurant/RestaurantListContainer';
import Restaurants from '../domain/Restaurants';
import { Restaurant } from '../types/types';
import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';
import ModalController from './modalController';

class AppController {
  modalController;
  restaurants;

  constructor() {
    this.modalController = new ModalController();
    this.restaurants = new Restaurants();
  }

  init() {
    this.renderHeader();
    this.renderFilterContainer();
    this.renderRestaurantListContainer();
    this.renderModal();
  }

  renderHeader() {
    const body = $('body');

    const header = Header({
      title: '점심 뭐 먹지',
      right: PlusButton({
        onclick: () => {
          this.modalController.switchContent(RestaurantAddModalContent());
          this.modalController.open();
        },
      }),
    });
    body?.prepend(header);
  }

  renderFilterContainer() {
    const main = $('main');

    const filterContainer = RestaurantFilterContainer();
    main?.prepend(filterContainer);

    $<HTMLSelectElement>('#category-filter')?.addEventListener('change', (event) => {
      const sortFilterValue = $<HTMLSelectElement>('#sort-filter')?.value;

      this.updateRestaurantListByFilter((event.target as HTMLSelectElement)?.value, sortFilterValue);
    });
    $<HTMLSelectElement>('#sorting-filter')?.addEventListener('change', (event) => {
      const categoryFilterValue = $<HTMLSelectElement>('#category-filter')?.value;

      this.updateRestaurantListByFilter(categoryFilterValue, (event.target as HTMLSelectElement)?.value);
    });
  }

  renderRestaurantListContainer() {
    const main = $('main');
    const container = RestaurantListContainer({ restaurants: this.restaurants.items });

    main?.appendChild(container);

    container.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const restaurantElement = target.closest('.restaurant'); // 가장 가까운 li 찾기

      if (!restaurantElement) return; // 클릭된 요소가 restaurant 아이템이 아니면 종료

      const restaurantName = (restaurantElement as HTMLElement).dataset.id; // data-id 값 가져오기
      const selectedRestaurant = this.restaurants.items.find((restaurant) => restaurant.name === restaurantName);

      if (selectedRestaurant) {
        const modalContent = createDOMElement({
          tag: 'div',
          class: 'modal-container',
          children: [
            RestaurantDetailInfo({ restaurant: selectedRestaurant }),
            createDOMElement({
              tag: 'div',
              class: 'button-container',
              children: [
                ActionButton({
                  text: '삭제하기',
                  type: 'button',
                  onclick: () => {
                    this.restaurants.removeRestaurant(selectedRestaurant.name);
                    this.modalController.close();
                    this.removeRestaurantItem(selectedRestaurant.name);
                  },
                }),
                CTAButton({ text: '닫기', type: 'submit', onclick: this.modalController.close }),
              ],
            }),
          ],
        });
        this.modalController.switchContent(modalContent);
        this.modalController.open();
      }
    });
  }

  renderModal() {
    const main = $('main');

    if (main) {
      this.modalController.attachTo(main);
      this.modalController.attachModalEvents();
      this.modalController.attachFormSubmitEvent((data) => this.addRestaurantItem(data));
    }
  }

  updateRestaurantListByFilter(categoryFilterValue?: string, sortFilterValue?: string) {
    const filteredRestaurants = this.restaurants.getRestaurantByFilter(
      categoryFilterValue ?? 'all',
      sortFilterValue ?? 'latest',
    );

    const restaurantListDOM = $('.restaurant-list');
    const restaurantList = RestaurantList({ restaurants: filteredRestaurants });

    restaurantListDOM?.replaceWith(restaurantList);
  }

  addRestaurantItem(restaurant: Restaurant) {
    const item = RestaurantItem({ restaurant });

    $('.restaurant-list')?.appendChild(item);
    this.restaurants.addRestaurant(restaurant);
  }

  removeRestaurantItem(restaurantName: string) {
    const restaurantList = $('.restaurant-list-container');

    if (restaurantList) {
      const target = restaurantList.querySelector(`[data-id="${restaurantName}"]`);
      target?.remove();
    }
  }
}

export default AppController;
