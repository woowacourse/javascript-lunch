import FilterBar from "../filter_bar/FilterBar";
import Header from "../header/Header";
import Modal from "../modal/Modal";
import RestaurantListContainer from "../restaurant_list/RestaurantListContainer";

function App() {
  const render = () => {
    Modal();
    Header();
    FilterBar();
    RestaurantListContainer();
  };

  render();
}

export default App;
