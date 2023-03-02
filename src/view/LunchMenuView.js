import { $ } from '../utils/dom';

const LunchMenuView = {
  render() {
    $('.restaurant-list-container').replaceChildren();
    $('.restaurant-list-container').insertAdjacentHTML(
      'beforeend',
      `<restaurant-list></restaurant-list>`
    );
  },

  bindEvents() {
    $('.gnb__button').addEventListener('click', () => this.openModal());
  },

  openModal() {
    $('.modal').showModal();
  },

  closeModal() {
    $('.modal').close();
  },
};

export default LunchMenuView;
