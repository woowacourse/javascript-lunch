import { Restaurant } from '../../interface/RestaurantInterfaces';

const DetailRestaurantModal = (restaurant: Restaurant) => {
  return /* html */ `
  <div>${restaurant.name}</div>
  `;
};

export default DetailRestaurantModal;
