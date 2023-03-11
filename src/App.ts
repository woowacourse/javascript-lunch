import $template from './app.html';
import LunchHeader from './components/Header';
import AddModal from './components/Modal';
import RestaurantItems from './components/RestaurantItems';
import SelectBox from './components/SelectBox';
import LunchTab from './components/Tab';
import { imgSrc } from './constants/image';
import store from './store';
import { CategoryFilter, Restaurant, Restaurants, SortFilter } from './types';

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
        const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
          typeof RestaurantItems
        >;
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

  private setRestaurantItemsProps(restaurants: Restaurants) {
    const $restaurantItems = this.querySelector('restaurant-items') as RestaurantItems;
    $restaurantItems.setProps({
      restaurants: restaurants,
      onRestaurantItemClick: (restaurantId: string) => {
        // detail-modal 열기
        const $detailModal = document.createElement('detail-modal');
        const { category, name, distance, isFavorite, description, link } =
          restaurants[restaurantId];

        $detailModal?.setAttribute('id', restaurantId);
        $detailModal?.setAttribute('src', imgSrc[category]);
        $detailModal?.setAttribute('category', category);
        $detailModal?.setAttribute('name', name);
        $detailModal?.setAttribute('distance', distance + '');
        $detailModal?.setAttribute('description', description || '');
        $detailModal?.setAttribute('link', link || '');

        document.body.insertAdjacentElement('beforeend', $detailModal);
      },
      onFavoriteButtonClick(restaurantId: string) {
        store.toggleFavoriteRestaurant(restaurantId);
        return;
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
    };
    $addModal.setProps({ onAddButtonClick });
  }
}

export default App;
