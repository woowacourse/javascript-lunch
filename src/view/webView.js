import { $ } from '../utils';

const webView = {
  closeModal: () => {
    $('add-restaurant-modal', '#modal').classList.remove('modal--open');
  },

  openModal: () => {
    $('add-restaurant-modal', '#modal').classList.add('modal--open');
  },
};

export default webView;
