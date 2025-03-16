import Component from '../core/Component.ts';
import { html } from '../lib/utils.ts';
import EventHandler from '../lib/EventHandler.ts';

export default class RestaurantHeader extends Component {
  override template() {
    return html`
      <header class="gnb">
        <h1 class="gnb__title text-title">오늘 뭐 먹지</h1>
        <button type="button" class="gnb__button" data-action="restaurant-add" aria-label="음식점 추가">
          <img src="images/add-button.png" alt="음식점 추가" />
        </button>
      </header>
    `;
  }

  override attachEventListener() {
    EventHandler.attachEventHandler(
      'click',
      () => document.querySelector('#restaurant-add-modal')?.classList.add('modal--open'),
      'restaurant-add',
    );
  }
}
