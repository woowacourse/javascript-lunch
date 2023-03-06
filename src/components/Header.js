import addButton from '../../templates/add-button.png';
import { showModal } from '../modal';

export default function Header($root, eventListener) {
  const $header = document.createElement('header');
  $header.className = 'gnb';

  this.init = () => {
    this.render();
    $header.addEventListener('click', showRestaurantAddUI);
    $root.appendChild($header);
  };

  this.render = () => {
    $header.innerHTML = `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
     <button type="button" class="gnb__button" aria-label="음식점 추가">
       <img src="${addButton}" alt="음식점 추가">
     </button>
   `;
  };

  const showRestaurantAddUI = (event) => {
    const { target } = event;

    if (target instanceof HTMLImageElement !== true) return;

    showModal();
    const $modalContainer = document.querySelector('.modal-container');
    new RestaurantForm($modalContainer, handleFormSubmit, handleFormCancel);
  };

  this.init();
}
