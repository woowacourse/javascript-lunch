import { renderRestaurantTabContainerComponent, renderRestaurantTabButtonContainer } from './renderHandlers';
import { allRestaurantTabClickHandler, favoritedRestaurantTabClickHandler } from './eventHandlers';

function RestaurantTab() {
  renderRestaurantTabContainerComponent();
  renderRestaurantTabButtonContainer();

  allRestaurantTabClickHandler();
  favoritedRestaurantTabClickHandler();
}

export default RestaurantTab;
