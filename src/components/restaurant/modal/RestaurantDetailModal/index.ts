import Restaurant from '../../../../domain/Restaurant';
import restaurants from '../../../../states/restaurants';
import Modal from '../../../common/Modal';
import Component from '../../../Component';
import { define } from '../../../decorators';
import style from './index.css';

export type RestaurantDeleteEvent = CustomEvent<void>;

@define('r-restaurant-detail-modal')
class RestaurantDetailModal extends Component {
  #restaurant?: Restaurant;

  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  open(restaurant: Restaurant) {
    this.#restaurant = restaurant;
    this.renderContent();
    this.shadowRoot?.querySelector<Modal>('r-modal')?.open();
  }

  close() {
    this.shadowRoot?.querySelector<Modal>('r-modal')?.close();
  }

  private onClickClose() {
    this.close();
  }

  private onClickDelete() {
    this.close();

    if (!this.#restaurant) return;
    restaurants.delete(this.#restaurant);
  }

  private onClickFavorite() {
    if (!this.#restaurant) return;
    restaurants.toggleFavorite(this.#restaurant);
  }

  private onSubmit(event?: SubmitEvent) {
    event?.preventDefault();
  }

  override renderTemplate() {
    return `
      <r-modal>
      </r-modal>
    `;
  }

  private renderContentTemplate() {
    return `
      <header slot="header">
        <section>
          <r-category-icon category="{category}"></r-category-icon>

          <r-button
            variant="transparent"
            onclick="this.host.onClickFavorite()"
          >
            <r-favorite-icon
              {favorite}
            ></r-favorite-icon>
          </r-button>
        </section>

        <h2 class="text-header">{name}</h2>
      </header>

      <article slot="content">
        <h3 class="text-body">캠퍼스부터 {distance}분 내</h3>

        <p class="text-body">{description}</p>

        <a href="{referenceUrl}" target="_blank" class="text-body">{referenceUrl}</a>
      </article>

      <div slot="actions">
        <r-button
          variant="secondary"
          full
          onclick="this.host.onClickDelete()"
        >삭제하기</r-button>

        <r-button
          variant="primary"
          full
          onclick="this.host.onClickClose()"
        >닫기</r-button>
      </div>
    `;
  }

  renderContent() {
    const $modal = this.shadowRoot?.querySelector<Modal>('r-modal');
    if (!$modal) return;

    $modal.innerHTML = Object.entries({
      category: this.#restaurant?.getCategory(),
      favorite: this.#restaurant?.isFavorite() ? 'active' : '',
      name: this.#restaurant?.getName(),
      distance: this.#restaurant?.getDistance(),
      description: this.#restaurant?.getDescription() ?? '',
      referenceUrl: this.#restaurant?.getReferenceUrl() ?? '',
    }).reduce((html, [placeholder, value]) => {
      return html.replaceAll(`{${placeholder}}`, String(value));
    }, this.renderContentTemplate());
  }
}

export default RestaurantDetailModal;
