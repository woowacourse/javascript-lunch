import addButton from '../../assets/add-button.png';
import { appendModal, showModal } from '../modal';
import RestaurantForm from './RestaurantForm';

export default function Header(renderListArticle: () => void) {
  const $header = document.createElement('header');
  $header.className = 'gnb';

  const template = `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
     <button type="button" class="gnb__button"  aria-label="음식점 추가">
       <img src="${addButton}" alt="음식점 추가">
     </button>
   `;

  $header.innerHTML = template;

  const $button = $header.querySelector('.gnb__button');
  $button?.addEventListener('click', (event) => {
    const { currentTarget } = event;
    if (!(currentTarget instanceof HTMLButtonElement)) return;

    showModal();
    appendModal(RestaurantForm(renderListArticle));
  });

  return $header;
}
