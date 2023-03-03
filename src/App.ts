import CategoryComboBox from './components/CategoryComboBox';
import Header from './components/Header';
import RestaurantAddModal from './components/RestaurantAddModal';
import RestaurantBlockList from './components/RestaurantBlockList';
import RestaurantFilter from './components/RestaurantFilter';
import SortComboBox from './components/SortComboBox';
import initialData from './data/initialData';
import { Category, SortCondition } from './data/type';
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
    new RestaurantAddModal();

    RestaurantBlockList.render(this.#list.getList('이름'));

    RestaurantFilter.setEventHandler(this.renderList);
  }

  renderList = (condition: SortCondition, category?: Category) => {
    RestaurantBlockList.render(this.#list.getList(condition, category));
  };
}

export default App;
