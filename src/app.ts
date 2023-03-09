/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NewRestaurantModal from './components/restaurant/modal/NewRestaurantModal';

class App {
  $modalOpenButton = document.querySelector<HTMLButtonElement>('#modal-open-button')!;

  init() {
    this.initEventHandlers();
  }

  initEventHandlers() {
    this.$modalOpenButton.addEventListener('click', () => {
      document.querySelector<NewRestaurantModal>('r-new-restaurant-modal')?.open();
    });
  }
}

export default App;
