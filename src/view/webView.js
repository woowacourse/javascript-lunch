import { $ } from '../utils';

const webView = {
  closeModal: () => {
    $('add-restaurant-modal', '#modal').classList.remove('modal--open');
  },
};

export default webView;
