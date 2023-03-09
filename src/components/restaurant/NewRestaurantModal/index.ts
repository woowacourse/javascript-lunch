import Restaurant from '../../../domain/Restaurant';
import Modal from '../../common/Modal';
import Component from '../../Component';
import style from './index.css';

export type NewRestaurantSubmitEvent = CustomEvent<Restaurant>;

class NewRestaurantModal extends Component {
  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  open() {
    this.shadowRoot?.querySelector<Modal>('r-modal')?.open();
  }

  close() {
    this.shadowRoot?.querySelector<Modal>('r-modal')?.close();
  }

  onClickCancel() {
    this.close();
  }

  onClickSubmit() {
    this.onSubmit();
  }

  onSubmit(event?: SubmitEvent) {
    event?.preventDefault();

    const restaurantProps = Object.fromEntries([
      ...new FormData(this.shadowRoot?.querySelector('form') ?? undefined).entries(),
    ]);

    const restaurant = new Restaurant({
      category: String(restaurantProps.category),
      name: String(restaurantProps.name),
      distance: Number(restaurantProps.distance),
      description: String(restaurantProps.description),
      referenceUrl: String(restaurantProps.referenceUrl),
    });

    const restaurantCreateEvent: NewRestaurantSubmitEvent = new CustomEvent('restaurantcreate', {
      bubbles: true,
      detail: restaurant,
    });
    this.dispatchEvent(restaurantCreateEvent);
    this.close();
  }

  onPostClose() {
    this.shadowRoot?.querySelector('form')?.reset();
  }

  override renderTemplate() {
    return `
      <r-modal title="새로운 음식점" onclose="this.host.onPostClose()">
        <form slot="content" onsubmit="this.host.onSubmit(event)">
          <r-restaurant-category-select
            name="category"
            required
            title="카테고리"
            default-option-label="선택해주세요"
          ></r-restaurant-category-select>

          <r-input
            name="name"
            required
            title="이름"
          ></r-input>

          <r-restaurant-distance-select
            name="distance"
            required
            title="거리(도보 이동 시간)"
            default-option-label="선택해주세요"
          ></r-restaurant-distance-select>

          <r-textarea
            name="description"
            title="설명"
            helper-text="메뉴 등 추가 정보를 입력해 주세요."
          ></r-textarea>

          <r-input
            name="referenceUrl"
            title="참고 링크"
            helper-text="매장 정보를 확인할 수 있는 링크를 입력해 주세요."
          ></r-input>
        </form>

        <div slot="actions">
          <r-button variant="secondary" onclick="this.host.onClickCancel()">취소하기</r-button>
          <r-button variant="primary" onclick="this.host.onClickSubmit()">추가하기</r-button>
        </div>
      </r-modal>
    `;
  }
}

customElements.define('r-new-restaurant-modal', NewRestaurantModal);

export default NewRestaurantModal;
