import Component from './core/Component';
import addButtonImg from '../assets/add-button.png';
import { $addEvent, $removeEvent, $setAttribute } from '../utils/dom';

class LunchPickerHeader extends Component {
  setEvent() {
    $addEvent(this, '.gnb__button', 'click', this.#openModal.bind(this));
  }

  removeEvent() {
    $removeEvent(this, '.gnb__button', 'click', this.#openModal.bind(this));
  }

  #openModal() {
    document.querySelector('restaurant-add-modal')?.setAttribute('open', 'true');
  }

  template() {
    return `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src=${addButtonImg} alt="음식점 추가">
        </button>
      </header>
    `;
  }
}

export default LunchPickerHeader;
