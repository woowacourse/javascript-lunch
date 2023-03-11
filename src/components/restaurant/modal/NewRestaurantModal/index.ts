import restaurants from '../../../../states/restaurants';
import Modal from '../../../common/Modal';
import Component from '../../../Component';
import { define } from '../../../decorators';
import style from './index.css';

@define('r-new-restaurant-modal')
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

  private onClickCancel() {
    this.close();
  }

  private onClickSubmit() {
    this.shadowRoot?.querySelector('button')?.click();
  }

  private onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const $form = this.shadowRoot?.querySelector('form');
    if (!($form instanceof HTMLFormElement)) return;

    const restaurantProps = Object.fromEntries([...new FormData($form).entries()]);

    restaurants.create({
      category: String(restaurantProps.category),
      name: String(restaurantProps.name),
      distance: Number(restaurantProps.distance),
      description: String(restaurantProps.description),
      referenceUrl: String(restaurantProps.referenceUrl),
    });
    this.close();
  }

  private onPostClose() {
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

          <r-restaurant-name-input
            name="name"
            required
            title="이름"
          ></r-restaurant-name-input>

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

          <button></button>
        </form>

        <div slot="actions">
          <r-button
            variant="secondary"
            full
            onclick="this.host.onClickCancel()"
          >취소하기</r-button>

          <r-button
            variant="primary"
            full
            onclick="this.host.onClickSubmit()"
          >추가하기</r-button>
        </div>
      </r-modal>
    `;
  }
}

export default NewRestaurantModal;
