import Header from './components/Header';
import Modal from './components/Modal';
import RestaurantItem from './components/RestaurantItem';
import RestaurantItems from './components/RestaurantItems';
import SelectBox from './components/SelectBox';
import store from './store';
import './styles';

store.initRestaurants();

customElements.define('lunch-header', Header);
customElements.define('restaurant-item', RestaurantItem);
customElements.define('restaurant-items', RestaurantItems);
customElements.define('add-modal', Modal);
customElements.define('select-box', SelectBox);

class App {
  header: Header | null;
  modal: Modal | null;

  constructor() {
    this.header = document.querySelector('lunch-header');
    this.modal = document.querySelector('add-modal');

    this.header?.addModalHandler(this.openModalButtonHandler);
  }

  openModalButtonHandler = () => {
    this.modal?.toggleModal();
  };
}

export default App;
new App();
