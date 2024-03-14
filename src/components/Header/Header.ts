import { $ } from '../../utils/querySelector';
import OutputView from '../../views/OutputView';

const Header = () => {
  const setEvents = () => {
    const addRestaurantButton = $('.gnb__button');
    addRestaurantButton.addEventListener('click', () => {
      OutputView.renderAddRestaurant();
    });
  };

  const render = () => {
    const content = /* html */ `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="./add-button.png" alt="음식점 추가" />
    </button>
    `;

    const headerContainer = $('.gnb');
    headerContainer.insertAdjacentHTML('beforeend', content);

    setEvents();
  };

  render();
};

export default Header;
