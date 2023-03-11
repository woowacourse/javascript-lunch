import LunchHeader from './components/Header';
import RestaurantItems from './components/RestaurantItems';
import LunchTab from './components/Tab';
import store from './store';

class App extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <lunch-header></lunch-header>
      <lunch-tab></lunch-tab>
      <select-box></select-box>
      <restaurant-items></restaurant-items>
      <add-modal></add-modal>
    `;
  }

  connectedCallback() {
    this.setLunchHeaderProps();
    this.setLunchTabProps();
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
}

export default App;
