import Component from './Component';
import { $addEvent, $removeEvent } from '../utils/dom';
import addButtonImg from '../assets/add-button.png';

class LunchPickerHeader extends Component {
  constructor() {
    super();
    this.hadleGnbButtonClick = () => this.makeCustomEvent('gnbButtonClick');
  }

  setEvent() {
    $addEvent('.gnb__button', 'click', this.hadleGnbButtonClick);
  }

  removeEvent() {
    $removeEvent('.gnb__button', 'click', this.hadleGnbButtonClick);
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
