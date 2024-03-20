import createHeader from './components/Header/Header';
import AddingRestaurantModal from './components/AddRestaurantModal/AddRestaurantModal';
import createNavbar from './components/Navbar/Navbar';
import createFilterDropdown from './components/FilterDropdown/FilterDropdown';
import createRestaurantItem from './components/Restaurant/RestaurantItem';
import DetailRestaurantModal from './components/Restaurant/DetailRestaurantModal';
import { FORM_INPUT_QUERY, LOCALSTORAGE_KEY } from './constant/constants';
import RestaurantService from './domain/RestaurantService';
import { $ } from './utils/querySelector';

class App {
  #restaurantList;

  #restaurantService;

  #isAllRestaurantsSelected;

  #category;

  #property;

  #addingRestaurantModal;

  #detailRestaurantModal;

  constructor() {
    this.#restaurantList = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.RESTAURANT_LIST)) || [];
    this.#restaurantService = new RestaurantService();
    this.#addingRestaurantModal = new AddingRestaurantModal();
    this.#detailRestaurantModal = new DetailRestaurantModal();

    this.#isAllRestaurantsSelected = true;
    this.#category = '전체';
    this.#property = 'name';
  }

  run() {
    const container = $('#container');

    container.appendChild(this.#addingRestaurantModal.element);
    container.appendChild(this.#detailRestaurantModal.element);

    this.renderHeader();
    this.renderNavbar();
    this.renderFilterDropdown();
    this.updateRestaurantList();
  }

  renderHeader() {
    const header = createHeader({
      title: '점심 뭐 먹지',
      imageSource: './add-button.png',
      onClick: () => {
        this.#addingRestaurantModal.open();
        this.manageAddRestaurantFormEvents();
      },
    });

    container.prepend(header);
  }

  renderNavbar() {
    const navbar = createNavbar({
      firstTitle: '모든 음식점',
      secondTitle: '자주 가는 음식점',
      onClick: isAllSelected => {
        this.#isAllRestaurantsSelected = isAllSelected;
        this.updateRestaurantList();
      },
    });

    container.appendChild(navbar);
  }

  renderFilterDropdown() {
    const filterDropdown = createFilterDropdown({
      onChangeFilter: category => {
        this.#category = category;
        this.updateRestaurantList();
      },
      onChangeSort: property => {
        this.#property = property;
        this.updateRestaurantList();
      },
    });

    container.appendChild(filterDropdown);
  }

  updateRestaurantList() {
    const restaurantListContainer = $('.restaurant-list-container');

    const currentRestaurantList = this.#isAllRestaurantsSelected
      ? this.#restaurantList
      : this.#restaurantService.filterByFavorite(this.#restaurantList);
    const filteredList = this.#restaurantService.filterByCategory(this.#category, currentRestaurantList);
    const processedList = this.#restaurantService.sortByProperty(this.#property, filteredList);

    const listFragment = this.getRestaurantItemsFragment(processedList);

    restaurantListContainer.replaceChildren(listFragment);
    container.appendChild(restaurantListContainer);
  }

  getRestaurantItemsFragment(processedList) {
    const listFragment = document.createElement('ul');
    listFragment.classList.add('restaurant-list');

    const restaurantItems = processedList.map(restaurantItem =>
      createRestaurantItem({
        restaurant: restaurantItem,
        onItemClick: () => {
          this.#detailRestaurantModal.restaurant = restaurantItem;
          this.#detailRestaurantModal.open();
          this.managedetailRestaurantEvents(restaurantItem);
        },
        onFavoriteButtonClick: event => {
          this.handleButtonChange(event, restaurantItem);
        },
      }),
    );

    listFragment.replaceChildren();
    restaurantItems.forEach(child => listFragment.appendChild(child));

    return listFragment;
  }

  manageAddRestaurantFormEvents() {
    const formAddRestaurant = $('.form-add-restaurant');

    formAddRestaurant.addEventListener('submit', e => {
      e.preventDefault();
      const newRestaurant = this.createRestaurant();
      const isAdded = this.#restaurantService.addRestaurant(newRestaurant, this.#restaurantList);
      const isAddedText = isAdded ? '추가되었습니다.' : '중복된 식당입니다. 다시 입력해주세요.';
      alert(isAddedText);

      if (!isAdded) return;

      this.updateRestaurantList();
      this.#addingRestaurantModal.close();
    });
  }

  createRestaurant() {
    const formData = {};

    FORM_INPUT_QUERY.forEach(id => {
      const input = $(id);
      formData[input.name] = input.name === 'distance' ? parseInt(input.value, 10) : input.value;
    });

    return formData;
  }

  managedetailRestaurantEvents(restaurantItem) {
    const detailRestaurant = $('.detail-restaurant');
    const favoriteButton = $('.favorite-button');

    favoriteButton.addEventListener('click', event => {
      this.handleButtonChange(event, restaurantItem);
      this.updateRestaurantList();
    });

    const buttonContainer = detailRestaurant.querySelector('.button-container');

    buttonContainer.addEventListener('click', event => {
      if (event.target.innerText === '삭제하기') {
        this.#restaurantList = this.#restaurantService.removeRestaurant(restaurantItem, this.#restaurantList);
        alert('삭제되었습니다.');
      }
      this.updateRestaurantList();
      this.#detailRestaurantModal.close();
    });
  }

  handleButtonChange(event, restaurantItem) {
    this.#restaurantService.changeFavorite(restaurantItem, this.#restaurantList);
    event.target.src = restaurantItem.favorite ? './favorite-icon-filled.svg' : './favorite-icon-lined.svg';
  }
}

export default App;
