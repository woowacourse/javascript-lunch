import { qs } from '../utils/domHelpers';
import Component from './Component';

class Header extends Component {
  constructor($target) {
    super($target);

    this.addEvent('click', (event) => {
      this.activateModal(event);
    });
  }

  render() {
    return `
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가">
        </button>
      `;
  }

  activateModal(event) {
    if (event.target.parentNode.type === 'button') {
      const modal = qs('.modal');
      modal.classList.add('modal--open');
    }
  }
}

export default Header;
