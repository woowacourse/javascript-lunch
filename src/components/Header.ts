import addButton from '../../assets/add-button.png';
import { IRestaurant } from '../domain/Restaurant';
import { appendModal, showModal } from '../modal';
import RestaurantForm from './RestaurantForm';

export default function Header(
  addRestaurantInfo: (restaurantInfo: IRestaurant) => void
) {
  const $header = document.createElement('header');
  $header.className = 'gnb';

  const template = `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
     <button type="button" class="gnb__button" >
       <img src="${addButton}" alt="음식점 추가" aria-label="음식점 추가">
     </button>
   `;

  $header.innerHTML = template;

  $header.addEventListener('click', (event) => {
    const { target } = event;
    if (!(target instanceof HTMLImageElement)) return;

    showModal();
    appendModal(RestaurantForm(addRestaurantInfo));
  });

  return $header;
}
