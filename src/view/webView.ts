import { Restaurant } from '../domain/model/RestaurantList';
import { $, $$$ } from '../utils';

const webView = {
  toggleModal: () => {
    $$$('add-restaurant-modal', '#modal').classList.toggle('modal--open');
  },

  resetForm: () => {
    $$$('add-restaurant-modal', '#categoryList').value = '';
    $$$('add-restaurant-modal', '#nameInput').value = '';
    $$$('add-restaurant-modal', '#distanceList').value = '';
    $$$('add-restaurant-modal', '#descriptionInput').value = '';
    $$$('add-restaurant-modal', '#linkInput').value = '';
  },

  renderRestaurantList: (list: Restaurant[]) => {
    $('#restaurantList').innerHTML = '';

    list.forEach((restaurant) => {
      const { category, name, distance, description, link } = restaurant;
      const tagContent = `<restaurant-box
        category="${category}"
        name="${name}"
        distance="${distance}"
        description="${description}"
        link="${link}"
      ></restaurant-box>`;

      $('#restaurantList').insertAdjacentHTML('beforeend', tagContent);
    });
  },
};

export default webView;
