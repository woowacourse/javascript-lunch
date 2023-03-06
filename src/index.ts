import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantItem from './components/RestaurantItem';
import RestaurantItems from './components/RestaurantItems';
import SelectBox from './components/SelectBox';
import store from './store';
import './styles';
import { $ } from './utils/dom';

store.initRestaurants();

customElements.define('lunch-header', Header);
customElements.define('restaurant-item', RestaurantItem);
customElements.define('restaurant-items', RestaurantItems);
customElements.define('add-modal', Modal);
customElements.define('select-box', SelectBox);

class App {
  header: Header;
  modal: Modal;

  constructor() {
    this.header = $<Header>('lunch-header');
    this.modal = $<Modal>('add-modal');

    this.header.addModalHandler(this.openModalButtonHandler);
  }

  openModalButtonHandler = () => {
    this.modal.toggleModal();
  };
}

export default App;
new App();
