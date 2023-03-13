import '../../css/restaurant-bottom-sheet.css';
import { $ } from '../utils/selector';
import { CATEGORY_IMAGES } from '../constants/asset';
import { BUTTON_TEXT } from '../constants/restaurantAddContainer';

class restaurantBottomSheet {
  #state = {
    selector: '',
  };

  constructor(state) {
    this.#state = state;
  }

  render(restaurant) {
    $(this.#state.selector).innerHTML = this.#template(restaurant);
  }

  #template({
    number,
    category,
    name,
    distance,
    description,
    isFavorite,
    link,
  }) {
    const favoriteOpenClass = isFavorite ? 'favorite-icon-filled--open' : '';

    /* html */
    return `
				<div class="head-info">

					<!-- 카테고리, 음식점 이름, 거리 컨테이너 -->
					<div class="head-left">

						<div class="restaurant__category">
							<img
								src="./category-${CATEGORY_IMAGES[category]}.png"
								alt="${category}"
								class="category-icon"
							/>
						</div>

						<h3 class="restaurant__name text-subtitle">
							${name}
						</h3>

						<span class="restaurant__distance text-body">
							캠퍼스부터 ${distance}분 내
						</span>
					</div>

					<!-- 즐겨찾기 등록/해제 버튼 -->
					<div class="favorite-icon-container">
					<img
						src="./favorite-icon-lined.png"
						alt="즐겨찾기"
						class="favorite-icon-lined favorite-icon-lined-${number}"
					/>
					<img
						src="./favorite-icon-filled.png"
						alt="즐겨찾기"
						class="favorite-icon-filled favorite-icon-filled-${number} ${favoriteOpenClass}"
					/>
					</div>
				</div>

				<!-- 음식점 설명 -->
				<p class="restaurant__description text-body">
					${description}
				</p>

				<!-- 하이퍼링크 -->
				<a class="restaurant-link"
					href="${link}"
				>
				${link}
				</a>

				<!-- 삭제/닫기 버튼 -->
				<div class="button-container-info-modal">
					<button
						class="button button--secondary text-caption"
						aria-label="delete"
						name="${number}"
					>
						${BUTTON_TEXT.DELETE}
					</button>
					<button class="button button--primary text-caption" aria-label="close">
						${BUTTON_TEXT.CLOSE}
					</button>
				</div>
		`;
  }
}

export default restaurantBottomSheet;
