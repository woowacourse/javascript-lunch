import { ICategory, IRestaurantInfo } from '../domain/Restaurant';
import RestaurantCatalog, { SORT_CONDITION } from '../domain/RestaurantCatalog';
import restaurantStore from '../store/RestaurantStore';
import { NAV_FAVORITE, NAV_TOTAL } from './Navigator/Navigator';
import RestaurantCard from './RestaurantCard';

const [SORT_BY_NAME, SORT_BY_DISTANCE] = SORT_CONDITION;

class RestaurantList {
  #restaurantUlElement = document.createElement('ul');

  #navState;

  #categoryFilter = '전체';

  #sortFilter = '이름순';

  constructor(navState: string) {
    this.#navState = navState;
    this.#restaurantUlElement.id = 'restaurant-list';
    this.#restaurantUlElement.classList.add('restaurant-list-container');

    this.renderRestaurantList();
  }

  renderRestaurantList() {
    const { restaurants } = restaurantStore;
    const category = this.#categoryFilter as ICategory;

    const filteredRestaurants = RestaurantCatalog.filterByCategory(restaurants, category);

    if (this.#sortFilter === SORT_BY_NAME) {
      this.#appendRestaurantElement(RestaurantCatalog.sortByName(filteredRestaurants));
    }
    if (this.#sortFilter === SORT_BY_DISTANCE) {
      this.#appendRestaurantElement(RestaurantCatalog.sortByDistance(filteredRestaurants));
    }
  }

  #appendRestaurantElement(restaurants: IRestaurantInfo[]) {
    this.#restaurantUlElement.innerHTML = '';
    if (this.#navState === NAV_FAVORITE) {
      restaurants.forEach((restaurant: IRestaurantInfo) => {
        if (restaurant.isFavorite) {
          const restaurantCard = new RestaurantCard({
            restaurant,
            onClick: () => {
              this.renderRestaurantList();
            },
          });
          this.#restaurantUlElement.appendChild(restaurantCard.element);
        }
      });
    }

    if (this.#navState === NAV_TOTAL) {
      restaurants.forEach((restaurant: IRestaurantInfo) => {
        const restaurantCard = new RestaurantCard({
          restaurant,
          onClick: () => {
            this.renderRestaurantList();
          },
        });
        this.#restaurantUlElement.appendChild(restaurantCard.element);
      });
    }
  }

  set navState(newState: string) {
    this.#navState = newState;
    this.renderRestaurantList();
  }

  set categoryFilter(category: string) {
    this.#categoryFilter = category;
    this.renderRestaurantList();
  }

  set sortFilter(sortFilter: string) {
    this.#sortFilter = sortFilter;
    this.renderRestaurantList();
  }

  get element() {
    return this.#restaurantUlElement;
  }
}

export default RestaurantList;
