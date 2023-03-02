import Component from './core/Component.js';

class App extends Component {
  setup() {
    this.$state = {};
  }

  template() {
    return `<div><h1>Hello</h1></div>`;
  }

  mounted() {
    const { toggleModal, addRestaurant, filterList, showRestaurants } = this;
    const $topNavBar = this.$target.querySelector('.gnb');
    const $filterBar = this.$target.querySelector(
      '.restaurant-filter-container'
    );
    const $listContainer = this.$target.querySelector(
      '.restaurant-list-container'
    );

    new TopNavBar($topNavBar, {
      toggleModal: toggleModal.bind(this),
      addRestaurant: addRestaurant.bind(this),
    });

    new FilterBar($filterBar, {
      filterList: filterList.bind(this),
    });

    new ListContainer($listContainer, {
      showRestaurants: showRestaurants.bind(this),
    });
  }

  toggleModal() {}

  addRestaurant() {}

  filterList() {}

  showRestaurants() {}
}

export default App;
