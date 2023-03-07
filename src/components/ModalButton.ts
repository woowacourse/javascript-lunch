import { Button } from '../data/image';

const ModalButton = {
  template() {
    return `
<button type="button" class="gnb__button" aria-label="음식점 추가">
  <img src=${Button.add} alt="음식점 추가">
</button>`;
  },
  setEvent() {
    const gnbButton = document.querySelector('.gnb__button');
    gnbButton?.addEventListener('click', () => this.openModal());
  },
  openModal() {
    const modal = document.querySelector('.modal') as HTMLElement;
    modal.className = 'modal--open';
  },
};

export default ModalButton;
