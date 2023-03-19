import Restaurant from '../../domain/Restaurant';
import type { Restaurants, RestaurantsState } from '../../states/restaurants';
import type { IParser } from './IParser';

class RestaurantsJSONParser implements IParser<RestaurantsState> {
  parse<Key extends keyof RestaurantsState>(
    key: Key,
    text: string,
    defaultValue: Restaurants[Key],
  ): Restaurants[Key] {
    try {
      const parsed = JSON.parse(text);

      if (key === 'restaurants') {
        return this.deserializeRestaurants(parsed) as Restaurants[Key];
      }
      return parsed;
    } catch (error) {
      return defaultValue;
    }
  }

  private deserializeRestaurants(objects: object[]) {
    const restaurants: Restaurant[] = objects.map((object) =>
      Object.setPrototypeOf(object, Restaurant.prototype),
    );
    return restaurants;
  }

  stringify<Key extends keyof RestaurantsState>(key: Key, state: RestaurantsState): string {
    return JSON.stringify(state[key]);
  }
}

export default RestaurantsJSONParser;
