import { $ } from '../utils/dom';

const LunchMenuView = {
  render(restaurants) {
    $('.restaurant-list-container').replaceChildren();
    $('.restaurant-list-container').insertAdjacentHTML(
      'beforeend',
      `<restaurant-list></restaurant-list>`
    );
    $('restaurant-list').render(restaurants);
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
