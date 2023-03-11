import $template from './app.html';
import LunchHeader from './components/Header';
import RestaurantItems from './components/RestaurantItems';
import SelectBox from './components/SelectBox';
import LunchTab from './components/Tab';
import store from './store';
import { CategoryFilter, SortFilter } from './types';

class App extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = $template;
  }

  connectedCallback() {
    this.setLunchHeaderProps();
    this.setLunchTabProps();
    this.setCategoryFilterBoxProps();
    this.setSortingFilterBoxProps();
  }

  private setLunchHeaderProps() {
    const $lunchHeader = this.querySelector('lunch-header') as LunchHeader;

    const onModalButtonClick = () => {
      const $modal = this.querySelector('.modal');
      $modal?.classList.add('modal--open');
    };

    $lunchHeader.setProps({ onModalButtonClick });
  }

  private setLunchTabProps() {
    const $lunchTab = this.querySelector('lunch-tab') as LunchTab;
    const props = {
      defaultActiveKey: '1',
      items: [
        {
          key: '1',
          label: '모든 음식점',
          children: '모든 음식점 리스트',
        },
        {
          key: '2',
          label: '자주 가는 음식점',
          children: '자주 가는 음식점 리스트',
        },
      ],
      onChange: (key: string) => {
        const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
          typeof RestaurantItems
        >;
        const $selectBox = document.querySelector('select-box') as HTMLElement;

        // 모든 음식점
        if (key === '1') {
          $restaurantItems.render(store.restaurants);
          $selectBox.style.display = '';
        }

        if (key === '2') {
          $restaurantItems.render(store.getFavoriteRestaurants());
          $selectBox.style.display = 'none';
        }
      },
    };

    $lunchTab.setProps(props);
  }

  private setCategoryFilterBoxProps() {
    const $categoryFilterBox = this.querySelector(
      'category-filter-box',
    ) as SelectBox<CategoryFilter>;

    $categoryFilterBox.setProps({
      options: ['전체', '한식', '중식', '일식', '양식', '아시안', '기타'],
      onChange: (option) => {
        store.filterRestaurants(option);
      },
    });
  }

  private setSortingFilterBoxProps() {
    const $categoryFilterBox = this.querySelector('sorting-filter-box') as SelectBox<SortFilter>;

    $categoryFilterBox.setProps({
      options: ['distance', 'name'],
      onChange: (option) => {
        store.sortRestaurants(option);
      },
    });
  }
}

export default App;
