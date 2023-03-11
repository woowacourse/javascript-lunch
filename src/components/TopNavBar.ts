import Component from '@res/core/Component';
import { eventBus } from '@res/core/eventBus';
import { $, on } from '@res/utils/domUtils';

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
        eventBus.dispatch('@modal-click');
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
