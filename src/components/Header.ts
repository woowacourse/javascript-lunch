import addButton from '../../assets/add-button.png';
import { IRestaurant } from '../domain/Restaurant';
import { appendModal, showModal } from '../modal';
import RestaurantForm from './RestaurantForm';

export default class Header {
  $header = document.createElement('header');

  constructor(
    $root: HTMLDivElement,
    addRestaurantInfo: (restaurantInfo: IRestaurant) => void
  ) {
    this.$header.className = 'gnb';
    this.render();

    this.$header.addEventListener('click', (event) => {
      const { target } = event;

      if (target instanceof HTMLImageElement !== true) return;

      showModal();
      appendModal(RestaurantForm(addRestaurantInfo));
    });

    $root.insertAdjacentElement('afterbegin', this.$header);
  }

  render = () => {
    this.$header.innerHTML = `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
     <button type="button" class="gnb__button" aria-label="음식점 추가">
       <img src="${addButton}" alt="음식점 추가">
     </button>
   `;
  };
}
