import Component from '../core/Component';
import { eventBus } from '../core/eventBus';
import { $, on } from '../utils/domUtils';

class TopNavBar extends Component {
  constructor(element: HTMLElement) {
    super(element);

    this.render().setEvent();
  }

  setEvent() {
    const btnElement = $('.add-button');

    if (!(btnElement instanceof HTMLButtonElement)) return this;

    on({
      target: btnElement,
      eventName: 'click',
      handler: () => {
        eventBus.dispatch('@click-add-modal');
      },
    });

    return this;
  }

  template() {
    return `<h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    <button type="button" class="gnb__button add-button" aria-label="음식점 추가">
      <img src='./add-button.png' alt="음식점 추가를 위한 입력 버튼" />
    </button>
    `;
  }
}

export default TopNavBar;
