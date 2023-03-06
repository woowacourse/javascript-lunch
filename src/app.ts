import FilterBar from './components/FilterBar';
import ListContainer from './components/ListContainer';
import AddModalContainer from './components/AddModalContainer';
import TopNavBar from './components/TopNavBar';
import { Category, Order } from './constants/enum';
import Component from './core/Component';
import IRestaurantInput from './interfaces/IRestaurantInput';
import { $ } from './utils/domUtils';

import { restaurantStore } from './model/restaurantStore';
import { sampleData } from './model/storage';
class App extends Component {
  readonly component: any;
  constructor() {
    super($('#app'));

    this.component = {
      topNavBar: new TopNavBar($('.gnb')),
      listContainer: new ListContainer($('.restaurant-list-container')),
      filterBar: new FilterBar($('.restaurant-filter-container')),
      AddModalContainer: new AddModalContainer(
        $('.restaurant-add-modal-container')
      ),
    };

    // localStorage에 샘플 데이터 입력
    restaurantStore.setList(sampleData);
  }
}

export default App;
