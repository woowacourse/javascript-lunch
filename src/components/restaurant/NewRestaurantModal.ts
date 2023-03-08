import Restaurant, { RestaurantCategory, RestaurantDistance } from '../../domain/Restaurant';
import Modal from '../common/Modal';
import Select from '../common/Select';
import Component from '../Component';

export type NewRestaurantSubmitEvent = CustomEvent<Restaurant>;

class NewRestaurantModal extends Component {
  open() {
    this.shadowRoot?.querySelector<Modal>('r-modal')?.open();
  }

  close() {
    this.shadowRoot?.querySelector('form')?.reset();
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

  override renderTemplate() {
    return `
      <style>
        form > * {
          margin-bottom: 36px;
        }

        div[slot="actions"] {
          display: flex;
          gap: 16px;
        }

        div[slot="actions"] > * {
          flex: 1;
        }
      </style>

      <r-modal title="새로운 음식점">
        <form slot="content" id="modal-form" onsubmit="this.host.onSubmit(event)">
          <r-select
            name="category"
            required
            title="카테고리"
          ></r-select>

          <r-input
            name="name"
            required
            title="이름"
          ></r-input>

          <r-select
            name="distance"
            required
            title="거리(도보 이동 시간)"
          ></r-select>

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

  override render() {
    super.render();

    this.shadowRoot
      ?.querySelector<Select<RestaurantCategory | null>>('r-select[name="category"]')
      ?.setOptions([
        { value: null, label: '선택해주세요' },
        ...Restaurant.CATEGORIES.map((category) => ({
          value: category,
          label: category,
        })),
      ]);

    this.shadowRoot
      ?.querySelector<Select<RestaurantDistance | null>>('r-select[name="distance"]')
      ?.setOptions([
        { value: null, label: '선택해주세요' },
        ...Restaurant.DISTANCES.map((distance) => ({
          value: distance,
          label: `${distance}분 내`,
        })),
      ]);
  }
}

customElements.define('r-new-restaurant-modal', NewRestaurantModal);

export default NewRestaurantModal;
