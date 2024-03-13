import FilterBar from '../filterBar/FilterBar';
import Header from '../header/Header';
import Modal from '../modal/Modal';
import RestaurantList from '../restaurantList/RestaurantList';
import RestaurantTab from '../restaurantTab/RestaurantTab';

function App() {
  Modal();
  Header();
  RestaurantTab();
  FilterBar();
  RestaurantList();
}

export default App;
