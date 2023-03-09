import Modal from '../../common/Modal';
import Component from '../../Component';
import style from './index.css';

export type RestaurantDeleteEvent = CustomEvent<void>;

class RestaurantDetailModal extends Component {
  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  open() {
    this.shadowRoot?.querySelector<Modal>('r-modal')?.open();
  }

  close() {
    this.shadowRoot?.querySelector<Modal>('r-modal')?.close();
  }

  onClickClose() {
    this.close();
  }

  onClickDelete() {
    const restaurantDeleteEvent: RestaurantDeleteEvent = new CustomEvent('restaurantdelete', {
      bubbles: true,
    });
    this.dispatchEvent(restaurantDeleteEvent);
    this.close();
  }

  onSubmit(event?: SubmitEvent) {
    event?.preventDefault();
  }

  override renderTemplate() {
    return `
      <r-modal title="${this.getAttribute('title')}">
        <article slot="content">
          <h3 class="text-body">캠퍼스부터 ${this.getAttribute('distance')}분 내</h3>

          <p class="text-body">${this.getAttribute('description') ?? ''}</p>

          <a>${this.getAttribute('reference-url') ?? ''}</a>
        </article>

        <div slot="actions">
          <r-button
            variant="secondary"
            onclick="this.host.onClickDelete()"
          >삭제하기</r-button>

          <r-button
            variant="primary"
            onclick="this.host.onClickClose()"
          >닫기</r-button>
        </div>
      </r-modal>
    `;
  }
}

customElements.define('r-restaurant-detail-modal', RestaurantDetailModal);

export default RestaurantDetailModal;
