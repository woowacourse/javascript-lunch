import App from './App';
import RESTAURANT_INFO from './mocks/restaurantInfo';
import { $ } from './utils/@common/domHelper';
import { getStorage, saveStorage } from './utils/@common/localStorage';
import { render } from './utils/core/Core';

const initializeData = () => {
  const existingRestaurants = getStorage();
  if (!existingRestaurants) {
    saveStorage(RESTAURANT_INFO);
  }
};

const initialize = () => {
  initializeData();
  render(App, $('#app'));
};

initialize();
