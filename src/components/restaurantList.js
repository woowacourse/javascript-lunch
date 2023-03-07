import '../assets/category-korean.png';
import '../assets/category-chinese.png';
import '../assets/category-japanese.png';
import '../assets/category-western.png';
import '../assets/category-asian.png';
import '../assets/category-etc.png';
import '../assets/favorite-icon-filled.png';
import '../assets/favorite-icon-lined.png';
import { CATEGORY_IMAGES } from '../constants/asset';
import { $inBody } from '../utils/selector';

class RestaurantList {
  render(restaurantList) {
    const restaurantListHTML = restaurantList
      .map(info => this.template(info))
      .join('');

    $inBody('.restaurant-list').innerHTML = restaurantListHTML;
  }

  renderAdditionRestaurant(restaurant) {
    $inBody('.restaurant').insertAdjacentHTML(
      'beforeend',
      this.template(restaurant)
    );
  }

  template({ category, name, distance, description }) {
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
    			<h3 class="restaurant__name text-subtitle">
						${name}
					</h3>
    			<span class="restaurant__distance text-body">
						캠퍼스부터 ${distance}분 내
					</span>
    			<p class="restaurant__description text-body">
    				${description}
    			</p>
    		</div>
    	</li>
		`;
  }
}

export default RestaurantList;
