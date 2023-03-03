import Restaurant from '../model/Restaurant';
import RestaurantList from '../model/RestaurantList';
import { $$$ } from '../../utils';
import webView from '../../view/webView';

class LunchRecommendation {
  #restaurants = new RestaurantList();

  constructor() {
    webView.renderRestaurantList(this.#restaurants.getList('전체', 'name'));
  }

  play() {
    $$$('add-restaurant-modal', '#addRestraunt').addEventListener(
      'click',
      (event) => {
        event.preventDefault();

        const category = $$$('add-restaurant-modal', '#categoryList').value;
        const name = $$$('add-restaurant-modal', '#nameInput').value;
        const distance = $$$('add-restaurant-modal', '#distanceList').value;
        const description = $$$(
          'add-restaurant-modal',
          '#descriptionInput'
        ).value;
        const link = $$$('add-restaurant-modal', '#linkInput').value;
        const restaurant = new Restaurant({
          category,
          name,
          distance,
          description,
          link,
        });
        this.#restaurants.add(restaurant);
        webView.toggleModal();
        webView.resetForm();
        webView.renderRestaurantList(this.#restaurants.getList('전체', 'name'));
      }
    );

    $$$('lunch-header', '#openModal').addEventListener(
      'click',
      webView.toggleModal
    );

    $$$('add-restaurant-modal', '#cancleModal').addEventListener(
      'click',
      webView.toggleModal
    );

    $$$('add-restaurant-modal', '#modalBackdrop').addEventListener(
      'click',
      webView.toggleModal
    );

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        webView.toggleModal();
      }
    });
  }
}

export default LunchRecommendation;
