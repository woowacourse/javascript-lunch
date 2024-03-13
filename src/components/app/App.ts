import RestaurantListStorageService from '../../services/restaurantListStorageService';
import FilterBar from '../filterBar/FilterBar';
import Header from '../header/Header';
import Modal from '../modal/Modal';
import RestaurantList from '../restaurantList/RestaurantList';
import RestaurantTab from '../restaurantTab/RestaurantTab';

const filterData = RestaurantListStorageService.getFilteredData() ?? [];

function App() {
  Modal();
  Header();
  RestaurantTab();
  FilterBar();
  RestaurantList(filterData);
}

export default App;
