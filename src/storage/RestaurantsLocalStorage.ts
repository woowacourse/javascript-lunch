import type { RestaurantsState } from '../states/restaurants';
import type { IStorage } from './IStorage';
import type { IParser } from './parsers/IParser';

class RestaurantsLocalStorage implements IStorage<RestaurantsState> {
  constructor(
    private readonly parser: IParser<RestaurantsState>,
    private readonly defaultState: RestaurantsState,
  ) {}

  save(state: RestaurantsState): void {
    localStorage.setItem(
      'restaurantIdCounter',
      this.parser.stringify('restaurantIdCounter', state),
    );
    localStorage.setItem('restaurants', this.parser.stringify('restaurants', state));
  }

  load(): RestaurantsState {
    const plainRestaurantIdCounter = localStorage.getItem('restaurantIdCounter');
    const plainRestaurants = localStorage.getItem('restaurants');
    return {
      restaurantIdCounter:
        plainRestaurantIdCounter === null
          ? this.defaultState.restaurantIdCounter
          : this.parser.parse(
              'restaurantIdCounter',
              plainRestaurantIdCounter,
              this.defaultState.restaurantIdCounter,
            ),
      restaurants:
        plainRestaurants === null
          ? this.defaultState.restaurants
          : this.parser.parse('restaurants', plainRestaurants, this.defaultState.restaurants),
    };
  }
}

export default RestaurantsLocalStorage;
