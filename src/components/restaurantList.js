import '../../css/restaurant-list.css';
import '../assets/category-korean.png';
import '../assets/category-chinese.png';
import '../assets/category-japanese.png';
import '../assets/category-western.png';
import '../assets/category-asian.png';
import '../assets/category-etc.png';
import '../assets/favorite-icon-filled.png';
import '../assets/favorite-icon-lined.png';
import { $ } from '../utils/selector';
import { CATEGORY_IMAGES } from '../constants/asset';

class RestaurantList {
  render(restaurantList) {
    const restaurantListHTML = restaurantList
      .map(info => this.#template(info))
      .join('');

    $('.restaurant-list').innerHTML = restaurantListHTML;
  }

  renderAdditionRestaurant(restaurant) {
    $('.restaurant').insertAdjacentHTML(
      'beforeend',
      this.#template(restaurant)
    );
  }

  #template({ number, category, name, distance, description, isFavorite }) {
    const favoriteOpenClass = isFavorite ? 'favorite-icon-filled--open' : '';

    /* html */
    return `
			<li class="restaurant">
    		<div class="restaurant__category">
    			<img
    				src="./category-${CATEGORY_IMAGES[category]}.png"
    				alt="${category}"
    				class="category-icon"
    			/>
    		</div>
    		<div class="restaurant__info">
					<div class="info-top">
						<div>
    					<h3 class="restaurant__name text-subtitle">
								${name}
							</h3>
    					<span class="restaurant__distance text-body">
								캠퍼스부터 ${distance}분 내
							</span>
						</div>
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
					<p class="restaurant__description text-body">
					${description}
					</p>
				</div>
    	</li>
		`;
  }
}

export default RestaurantList;
