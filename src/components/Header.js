import AddRestaurant from './AddRestaurant';
import AddRestaurantModal from './AddRestaurantModal';

const Header = {
  set(restaurantList) {
    const $header = document.querySelector('.gnb');
    const gnbTitle = this.createGnbTitle();
    const gnbButton = this.createGnbButton();

    gnbButton.addEventListener('click', () => this.handleOpenAddRestaurantModal(restaurantList));

    $header.appendChild(gnbTitle);
    $header.appendChild(gnbButton);
  },

  createGnbTitle() {
    const gnbTitle = document.createElement('h1');

    gnbTitle.classList.add('gnb__title', 'text-title');
    gnbTitle.textContent = '점심 뭐 먹지';

    return gnbTitle;
  },

  createGnbButton() {
    const gnbButton = document.createElement('button');
    const addImg = document.createElement('img');

    gnbButton.setAttribute('type', 'button');
    gnbButton.setAttribute('aria-label', '음식점 추가');
    gnbButton.classList.add('gnb__button');

    addImg.setAttribute('src', './images/add-button.png');
    addImg.setAttribute('alt', '음식점 추가');

    gnbButton.appendChild(addImg);

    return gnbButton;
  },

  handleOpenAddRestaurantModal(restaurantList) {
    const addRestaurantModal = new AddRestaurantModal(new AddRestaurant(), restaurantList);
    const addRestaurantModalElement = addRestaurantModal.getElement();
    const $modalContainer = document.getElementById('modal-container');

    $modalContainer.appendChild(addRestaurantModalElement);
    addRestaurantModal.toggle();
  },
};

export default Header;
