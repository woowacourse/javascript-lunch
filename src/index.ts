import '../css/style.css';
import RestaurantManager from './domains/restaurantManager';
import { components } from './components/components';
import { eventListener } from './handleUi/eventListener';

const App = {
  RestaurantManager: RestaurantManager.getInstance(),

  init() {
    this.RestaurantManager.initRestaurantList();
    components.initRender();
    eventListener.initEventListeners(this.RestaurantManager);
  },
};

App.init();
