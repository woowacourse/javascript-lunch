import $template from './app.html';
import DetailModal from './components/DetailModal';
import LunchHeader from './components/Header';
import AddModal from './components/Modal';
import RestaurantItems from './components/RestaurantItems';
import SelectBox from './components/SelectBox';
import LunchTab from './components/Tab';
import { imgSrc } from './constants/image';
import store from './store';
import { CategoryFilter, Restaurant, Restaurants, SortFilter } from './types';

class App extends HTMLElement {
  private activeTabKey: string = '1';

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
    this.setRestaurantItemsProps(store.restaurants);
    this.setAddModalProps();
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
        const $filterBoxes = document.querySelector('#filter') as HTMLDivElement;

        // 모든 음식점
        if (key === '1') {
          this.setRestaurantItemsProps(store.restaurants);
          $filterBoxes.style.display = '';
        }

        if (key === '2') {
          this.setRestaurantItemsProps(store.getFavoriteRestaurants());
          $filterBoxes.style.display = 'none';
        }

        this.activeTabKey = key;
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
        this.setRestaurantItemsProps(store.restaurants);
      },
    });
  }

  private setSortingFilterBoxProps() {
    const $categoryFilterBox = this.querySelector('sorting-filter-box') as SelectBox<SortFilter>;

    $categoryFilterBox.setProps({
      options: ['distance', 'name'],
      onChange: (option) => {
        store.sortRestaurants(option);
        this.setRestaurantItemsProps(store.restaurants);
      },
    });
  }

  private setRestaurantItemsProps(restaurants: Restaurants) {
    const $restaurantItems = this.querySelector('restaurant-items') as RestaurantItems;
    $restaurantItems.setProps({
      restaurants: restaurants,
      onRestaurantItemClick: (restaurantId: string) => {
        // detail-modal 열기
        const $detailModal = this.querySelector('detail-modal') as DetailModal;

        this.setDetailModalProps(restaurantId);
        $detailModal.toggle();
      },

      onFavoriteButtonClick: (restaurantId: string) => {
        store.toggleFavoriteRestaurant(restaurantId);
      },
    });
  }

  private setAddModalProps() {
    const $addModal = this.querySelector('add-modal') as AddModal;
    const onAddButtonClick = ({
      category,
      name,
      distance,
      isFavorite,
      description,
      link,
    }: Restaurant) => {
      store.addRestaurants({
        category,
        name,
        distance,
        isFavorite,
        description,
        link,
      });
      this.setRestaurantItemsProps(store.restaurants);
    };
    $addModal.setProps({ onAddButtonClick });
  }

  private setDetailModalProps(restaurantId: string) {
    const $detailModal = this.querySelector('detail-modal') as DetailModal;

    $detailModal.setProps({
      restaurant: store.restaurants[restaurantId],
      onRemoveButtonClick: () => {
        store.removeRestaurant(restaurantId);
        this.setRestaurantItemsProps(store.restaurants);
      },
      onCloseButtonClick: () => {
        this.setRestaurantItemsProps(
          this.activeTabKey === '1' ? store.restaurants : store.getFavoriteRestaurants(),
        );
      },
      onFavoriteButtonClick: () => {
        store.toggleFavoriteRestaurant(restaurantId);
      },
    });
  }
}

export default App;
