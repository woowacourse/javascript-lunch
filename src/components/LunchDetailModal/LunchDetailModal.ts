import './style.css';
import '../LunchButton/LunchButton';
import { CATEGORY_IMG } from '../../constants/categoriesImage';
import { LIKED, NOT_LIKED } from '../../imgs';
import { Category, Distance } from '../../types';
import { LunchItemProps } from '../LunchItem/LunchItem';

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
  <div class="detail-modal">
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
        <lunch-button></lunch-button>
        <lunch-button></lunch-button>
      </div>
    </div>
  </div>
`;

class LunchDetailModal extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    // const { category, name, distance, description, liked, link} :LunchDetailModalProps = this.getAttribute('restaurant') as Restaurant;
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
}

customElements.define('lunch-detail-modal', LunchDetailModal);
