import App from './App';
import RESTAURANT_INFO from './src/mocks/restaurantInfo';
import { $ } from './src/utils/@common/domHelper';
import { getStorage, saveStorage } from './src/utils/@common/localStorage';
import { render } from './src/utils/core/Core';

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
