import addButton from '../../templates/add-button.png';
import { showModal } from '../modal';

export default class Header {
  $header = document.createElement('header');

  constructor($root: HTMLDivElement) {
    this.$header.className = 'gnb';
    this.render();
    this.$header.addEventListener('click', this.showRestaurantAddUI);
    $root.appendChild(this.$header);
  }

  render = () => {
    this.$header.innerHTML = `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
     <button type="button" class="gnb__button" aria-label="음식점 추가">
       <img src="${addButton}" alt="음식점 추가">
     </button>
   `;
  };

  showRestaurantAddUI = (event: Event) => {
    const { target } = event;

    if (target instanceof HTMLImageElement !== true) return;
    showModal();
  };
}
