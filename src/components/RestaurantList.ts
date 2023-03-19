import '../../css/restaurant-list.css';
import { $ } from '../utils/selector';
import { RestaurantListState, RestaurantType } from '../type/types';
import FavoriteIcon from './FavoriteIcon';
import RestaurantCategory from './RestaurantCategory';
import RestaurantName from './RestaurantName';
import RestaurantDistance from './RestaurantDistance';
import RestaurantDescription from './RestaurantDescription';

class RestaurantList {
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

  render(restaurantList: RestaurantType[]) {
    const restaurantListContainer = $(this.state.container);
    const restaurantListHTML = restaurantList.map(info => this.template(info)).join('');

    if (restaurantListContainer) {
      restaurantListContainer.innerHTML = restaurantListHTML;
    }
  }

  private template({ number, category, name, distance, description, isFavorite }: RestaurantType) {
    /* html */
    return `
			<li class="restaurant">
    		<div class="restaurant__category">
    			${this.state.categoryComponent?.template(category)}
    		</div>

    		<div class="restaurant__info">
					<div class="info-top">
						<div>
    					${this.state.nameComponent?.template(name)}
    					${this.state.distanceComponent?.template(distance)}
						</div>

						<div class="favorite-icon-container">
							${this.state.favoriteComponent?.template(number, isFavorite ? 'favorite-icon-filled--open' : '')}
						</div>
					</div>

					${this.state.descriptionComponent?.template(description)}

					<button
						class="restaurant-info-open-button"
						name="${number}"
						aria-label="open-restaurant-info"
					/>
				</div>
    	</li>
		`;
  }
}

export default RestaurantList;
