import '../css/style.css';
import RestaurantManager from './domains/RestaurantManager';
import { components } from './components/components';
import { eventListener } from './handleUi/eventListener';

const App = {
  restaurantManager: RestaurantManager.getInstance(),

  init() {
    this.restaurantManager.initRestaurantList();
    components.initRender();
    eventListener.initEventListeners(this.restaurantManager);
  },
};

App.init();
