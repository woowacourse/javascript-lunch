import Filters from './components/Filters';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import RestaurantService from './domain/RestaurantService';

export default function App($app) {
  this.state = {
    main: null,
    header: null,
    filters: null,
    restaruantList: null,
    restaurantService: new RestaurantService(),
  };

  this.init = () => {
    this.state.header = new Header($app, showRestaurantAddUI);

    appendMain();

    const { main, restaurantService } = this.state;

    this.state.filters = new Filters(main, () => {});
    this.state.restaruantList = new RestaurantList(
      main,
      restaurantService.getRestaurantsInfo()
    );
  };

  this.render = () => {};

  const showRestaurantAddUI = () => {
    console.log('modal 추가');
  };

  const appendMain = () => {
    const $main = document.createElement('main');
    $app.appendChild($main);
    this.state.main = $main;
  };

  this.init();
}
