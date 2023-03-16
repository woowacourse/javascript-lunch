import FilterBar from './components/FilterBar';
import RestaurantListContainer from './components/RestaurantListContainer';
import AddModalContainer from './components/AddModalContainer';
import TopNavBar from './components/TopNavBar';
import Component from './core/Component';
import { $ } from './utils/domUtils';
import { restaurantStore } from './model/restaurantStore';
import MenuTabBar from './components/MenuTabBar';
import DetailModal from './components/DetailModal';
import DeleteModal from './components/DeleteModal';

class App extends Component {
  readonly component: any;
  constructor() {
    super($('#app'));
    // localStorage에 샘플 데이터 입력
    restaurantStore.init();

    this.component = {
      topNavBar: new TopNavBar($('.gnb')),
      RestaurantListContainer: new RestaurantListContainer($('.restaurant-list-container')),
      filterBar: new FilterBar($('.restaurant-filter-container')),
      addModalContainer: new AddModalContainer($('.restaurant-add-modal-container')),
      menuTabBar: new MenuTabBar($('.menu-tab-bar')),
      detailModal: new DetailModal($('.detail-modal-container')),
      deleteModal: new DeleteModal($('.delete-modal')),
    };
  }
}

export default App;
