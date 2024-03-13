import { allRestaurantTabClickHandler, favoritedRestaurantTabClickHandler } from './eventHandlers';
import { renderRestaurantTabButtonContainer, renderRestaurantTabContainerComponent } from './renderHandlers';

function RestaurantTab() {
  renderRestaurantTabContainerComponent();
  renderRestaurantTabButtonContainer();

  allRestaurantTabClickHandler();
  favoritedRestaurantTabClickHandler();
}

export default RestaurantTab;
