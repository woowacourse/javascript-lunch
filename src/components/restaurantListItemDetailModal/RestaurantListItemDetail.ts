import { RestaurantState } from '../../types';
import renderRestaurantListItemBottomSheetComponent from './renderHandlers';

function RestaurantListItemDetail(targetRestaurantListItem: RestaurantState) {
  const restaurantListItemDetailComponent = renderRestaurantListItemBottomSheetComponent(targetRestaurantListItem);

  return restaurantListItemDetailComponent;
}

export default RestaurantListItemDetail;
