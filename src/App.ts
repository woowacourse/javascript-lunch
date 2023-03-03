import CategoryComboBox from './components/CategoryComboBox';
import Header from './components/Header';
import RestaurantAddModal from './components/RestaurantAddModal';
import RestaurantBlock from './components/RestaurantBlock';
import RestaurantBlockList from './components/RestaurantBlockList';
import RestaurantFilter from './components/RestaurantFilter';
import SortComboBox from './components/SortComboBox';
import initialData from './data/initialData';
import RestaurantList from './domain/RestaurantList';

class App {
  #list;

  constructor() {
    this.#list = new RestaurantList(initialData);
  }

  init() {
    new Header();
    new RestaurantFilter();
    new CategoryComboBox();
    new SortComboBox();
    new RestaurantBlockList();
    RestaurantBlockList.render(this.#list.getList('이름'));
    // initialData.forEach((restaurant) => {
    //   new RestaurantBlock(restaurant);
    // });

    new RestaurantAddModal();
  }
}

export default App;
