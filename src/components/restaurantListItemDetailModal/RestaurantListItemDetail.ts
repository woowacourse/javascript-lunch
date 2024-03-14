import { RestaurantState } from '../../types';
import renderRestaurantListItemDetailComponent from './renderHandlers';

function RestaurantListItemDetail(targetRestaurantListItem: RestaurantState) {
  const restaurantListItemDetailComponent = renderRestaurantListItemDetailComponent(targetRestaurantListItem);

  return restaurantListItemDetailComponent;
}

export default RestaurantListItemDetail;
