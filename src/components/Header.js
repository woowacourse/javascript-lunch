import { qs } from '../utils/domHelpers';
import Component from '../Component';

class Header extends Component {
  constructor($target) {
    super($target);

    this.addEvent('click', (event) => {
      if (event.target.parentNode.type === 'button') this.activateModal();
      if (event.target.className.includes('gnb__title')) this.disActivateModal();
    });
  }

  template() {
    return `
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가">
        </button>
      `;
  }

  activateModal() {
    qs('.modal').classList.add('modal--open');
  }

  disActivateModal() {
    qs('.modal').classList.remove('modal--open');
  }
}

export default Header;
