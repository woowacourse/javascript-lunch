import Header from './components/Header';
import RestaurantAddModal from './components/RestaurantAddModal';
import RestaurantBlockList from './components/RestaurantBlockList';
import RestaurantFilter from './components/RestaurantFilter';
import initialData from './data/initialData';
import RestaurantList from './domain/RestaurantList';

class App {
  constructor(private list = new RestaurantList(initialData)) {}

  init() {
    console.log(this.list);
    document.body.innerHTML =
      Header +
      RestaurantFilter +
      RestaurantBlockList(this.list.getList('이름')) +
      RestaurantAddModal;
  }
}

export default App;
