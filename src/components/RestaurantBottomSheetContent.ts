import '../../css/restaurant-bottom-sheet.css';
import { $ } from '../utils/selector';
import { BUTTON_TEXT } from '../constants/restaurantAddModalContent';
import { RestaurantListState, RestaurantType } from '../type/types';
import FavoriteIcon from './FavoriteIcon';
import RestaurantCategory from './RestaurantCategory';
import RestaurantName from './RestaurantName';
import RestaurantDistance from './RestaurantDistance';
import RestaurantDescription from './RestaurantDescription';

class RestaurantBottomSheetContent {
  private state: RestaurantListState = {
    container: '',
    nameComponent: null,
    distanceComponent: null,
    categoryComponent: null,
    favoriteComponent: null,
    descriptionComponent: null,
  };

  constructor(state: {
    container: string;
    nameComponent: RestaurantName;
    distanceComponent: RestaurantDistance;
    categoryComponent: RestaurantCategory;
    favoriteComponent: FavoriteIcon;
    descriptionComponent: RestaurantDescription;
  }) {
    this.state = state;
  }

  render(restaurant: RestaurantType) {
    const bottomSheet = $(this.state.container);

    if (bottomSheet) {
      bottomSheet.innerHTML = this.template(restaurant);
    }
  }

  private template({
    number,
    category,
    name,
    distance,
    description,
    isFavorite,
    link,
  }: RestaurantType) {
    /* html */
    return `
			<div class="modal-backdrop"></div>
			<div class="restaurant-bottom-sheet-container">
				<div class="head-info">

					<!-- 카테고리, 음식점 이름, 거리 컨테이너 -->
					<div class="head-left">

						<div class="restaurant__category">
							${this.state.categoryComponent?.template(category)}
						</div>

						${this.state.nameComponent?.template(name)}
						${this.state.distanceComponent?.template(distance)}
					</div>

					<!-- 즐겨찾기 등록/해제 버튼 -->
					<div class="favorite-icon-container">
						${this.state.favoriteComponent?.template(number, isFavorite ? 'favorite-icon-filled--open' : '')}
					</div>
				</div>

				<!-- 음식점 설명 -->
				${this.state.descriptionComponent?.template(description)}

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
			</div>
		`;
  }
}

export default RestaurantBottomSheetContent;
