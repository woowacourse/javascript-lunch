import FilterBar from './components/FilterBar';
import ListContainer from './components/ListContainer';
import AddModalContainer from './components/AddModalContainer';
import TopNavBar from './components/TopNavBar';
import Component from './core/Component';
import { $ } from './utils/domUtils';
import { restaurantStore } from './model/restaurantStore';
import MenuTabBar from './components/MenuTabBar';
import DetailModal from './components/DetailModal';

class App extends Component {
  readonly component: any;
  constructor() {
    super($('#app'));
    // localStorage에 샘플 데이터 입력
    restaurantStore.init();

    this.component = {
      topNavBar: new TopNavBar($('.gnb')),
      listContainer: new ListContainer($('.restaurant-list-container')),
      filterBar: new FilterBar($('.restaurant-filter-container')),
      addModalContainer: new AddModalContainer($('.restaurant-add-modal-container')),
      menuTabBar: new MenuTabBar($('.menu-tab-bar')),
      detailModal: new DetailModal($('.detail-modal-container')),
    };
  }
}

export default App;
