import './style.css';
import '../LunchButton/LunchButton';
import { CATEGORY_IMG } from '../../constants/categoriesImage';
import { LIKED, NOT_LIKED } from '../../imgs';
import { Category, Distance } from '../../types';
import { LunchItemProps } from '../LunchItem/LunchItem';
import RestaurantDataUpdater from '../../domain/RestaurantDataUpdater';
import LunchItems from '../LunchItems/LunchItems';

type LunchDetailModalProps = LunchItemProps & {
  link: string;
};

// eslint-disable-next-line max-lines-per-function
const LUNCH_DETAIL_MODAL_TEMPLATE = ({
  category,
  name,
  distance,
  description,
  link,
  liked,
}: LunchDetailModalProps) => /* HTML */ `
  <div class="detail-modal detail-modal--open">
    <div class="detail-modal-backdrop">
      <div class="detail-modal-container">
        <div class="detail-modal-header">
          <!-- 헤더 이미지 -->
          <div class="detail-modal-header-img">
            <div class="detail-modal-header-img--category">
              <img src=${CATEGORY_IMG[category]} alt=${category} class="category-icon" />
            </div>
            <div class="detail-modal-header-img--liked">
              <img src=${liked === 'true' ? LIKED : NOT_LIKED} alt="liked" class="liked-icon" />
            </div>
          </div>
          <!-- 헤더 타이틀 -->
          <div class="detail-modal-header-title">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스로부터 ${distance}분 내</span>
          </div>

          <!-- 컨텐츠 영역 -->
          <div class="detail-modal-body">
            <p class="text-body">${description}</p>
            <a href="${link}">${link ?? ''}</a>
          </div>
        </div>

        <!-- 하단 영역 -->
        <div class="detail-modal-footer">
          <lunch-button
            type="button"
            text="삭제하기"
            color="secondary"
            class="detail-modal-delete"
          ></lunch-button>
          <lunch-button
            type="button"
            text="닫기"
            color="primary"
            class="detail-modal-closed"
          ></lunch-button>
        </div>
      </div>
    </div>
  </div>
`;

class LunchDetailModal extends HTMLElement {
  static get observedAttributes() {
    return ['category', 'name', 'distance', 'description', 'liked', 'link'];
  }

  connectedCallback() {
    this.render();
    this.setEventListener();
  }

  render() {
    const category: Category = this.getAttribute('category') as Category;
    const name: string = this.getAttribute('name') ?? '';
    const distance: Distance = (Number(this.getAttribute('distance')) as Distance) ?? 10;
    const description: string = this.getAttribute('description') ?? '';
    const liked: string = this.getAttribute('liked') ?? '';
    const link: string = this.getAttribute('link') ?? '';
    this.innerHTML = LUNCH_DETAIL_MODAL_TEMPLATE({
      category,
      name,
      distance,
      description,
      link,
      liked,
    });
  }

  setEventListener() {
    const closeModalButton = this.querySelector('.detail-modal-closed');
    closeModalButton?.addEventListener('click', () => this.handleModalClose());

    const deleteItemButton = this.querySelector('.detail-modal-delete');
    deleteItemButton?.addEventListener('click', () => this.handleDeleteItem.call(this));
  }

  handleModalClose() {
    const modal = this.querySelector('.detail-modal');
    if (modal?.className) {
      modal.classList.remove('detail-modal--open');
    }
  }

  attributeChangedCallback() {
    this.connectedCallback();
  }

  handleDeleteItem() {
    const name: string = this.getAttribute('name') ?? '';
    RestaurantDataUpdater.deleteItem({ name });
    this.handleModalClose();
    this.renderItems();
  }

  renderItems() {
    const lunchItems = document.querySelector('lunch-items') as LunchItems;
    if (lunchItems) {
      lunchItems.render();
    }
  }
}

customElements.define('lunch-detail-modal', LunchDetailModal);
