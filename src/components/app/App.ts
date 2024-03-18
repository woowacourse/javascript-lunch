import FilterBar from "../filter-bar/FilterBar";
import Header from "../header/Header";
import Modal from "../modal/Modal";
import RestaurantListContainer from "../restaurant-list/RestaurantListContainer";
import Tabs from "../tabs/Tabs";

function App() {
  Modal();
  Header();
  Tabs();
  FilterBar();
  RestaurantListContainer();
}

export default App;
