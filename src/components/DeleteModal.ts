import Component from '../core/Component';
import { eventBus } from '../core/eventBus';
import { restaurantStore } from '../model/restaurantStore';
import { $, on } from '../utils/domUtils';
import { buttonTemplate } from './templates/button';

export default class DeleteModal extends Component {
  #restaurantIdCache!: number;

  constructor(target: HTMLElement) {
    super(target);

    this.subscribe();
  }

  subscribe() {
    eventBus.subscribe('@remove-favorite', (id: number) => {
      this.#restaurantIdCache = id;

      this.render().setEvent();

      const timer = setTimeout(() => {
        this.hide.call(this);
      }, 5000);

      eventBus.subscribe('@toggle-favorite', () => {
        clearTimeout(timer);
      });
    });
  }

  hide() {
    this.$target.innerHTML = '';

    return this;
  }

  setEvent() {
    on({
      target: $('.undo', this.$target),
      eventName: 'click',
      handler: this.handleClickUndo.bind(this),
    });

    return this;
  }

  handleClickUndo() {
    restaurantStore.toggleFavorite(this.#restaurantIdCache);
    eventBus.dispatch('@toggle-favorite');
    this.hide();
  }

  template() {
    return `  
      <div class="modal modal--open">
        <div class="modal-container delete-modal">
          <p>즐겨찾기가 해제되었습니다.</p>
          ${buttonTemplate(
            { content: 'undo', type: 'button' },
            { className: 'button button--primary text-caption undo' }
          )}
          </div>
        </div>
      </div>
    `;
  }
}
