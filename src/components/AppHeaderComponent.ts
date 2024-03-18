import Component from './Component';
import ADD_BUTTON_IMAGE from '../assets/images/add-button.png';
import { $ } from '../utils/dom';

class AppHeaderComponent extends Component {
  protected render() {
    return `
      <header class="app-header">
        <h1 class="app-header__title text-title">점심 뭐 먹지</h1>
        ${this.addButton()}
      </header>
    `;
  }

  private addButton() {
    return `
      <button id="add-button" type="button" class="app-header__button" aria-label="음식점 추가">
        <img src=${ADD_BUTTON_IMAGE} alt="음식점 추가" />
      </button>
    `;
  }

  protected setEvents() {
    this.addEvent({
      target: $('#add-button', this),
      type: 'click',
      handler: this.handleAddButtonClick
    });
  }

  private handleAddButtonClick: EventListener = () => {
    this.emitCustomEvent('openModal', { component: 'add-rest-form' });
  };
}

customElements.define('app-header', AppHeaderComponent);
