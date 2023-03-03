import { $$$ } from '../utils';

const webView = {
  toggleModal: () => {
    $$$('add-restaurant-modal', '#modal').classList.toggle('modal--open');
  },
};

export default webView;
