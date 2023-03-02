import { $ } from '../utils/dom';

const LunchMenuView = {
  render() {
    $('.restaurant-list-container').insertAdjacentHTML(
      'beforeend',
      `<restaurant-list></restaurant-list>`
    );
  },

  bindEvents() {
    $('.gnb__button').addEventListener('click', () => $('.modal').showModal());
  },
};

export default LunchMenuView;
