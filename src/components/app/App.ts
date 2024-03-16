import RestaurantListStorageService from '../../services/restaurantListStorageService';
import Header from '../header/Header';
import Modal from '../modal/Modal';
import RestaurantList from '../restaurantList/RestaurantList';
import { mountFilterBarComponent } from '../restaurantTab/renderHandlers';
import RestaurantTab from '../restaurantTab/RestaurantTab';
import ApplicationMain from './applicationMain/ApplicationMain';

const filterData = RestaurantListStorageService.getFilteredData() ?? [];

function App() {
  Modal();
  Header();
  RestaurantTab();
  ApplicationMain();
  mountFilterBarComponent(filterData);
  RestaurantList(filterData);
}

export default App;
