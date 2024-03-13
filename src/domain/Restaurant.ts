import type { IRestaurant } from '../types/restaurant';

class Restaurant {
  information;

  constructor(information: IRestaurant) {
    this.information = information;
  }

  isMatchedCategory(category: string): boolean {
    return this.information.category === category;
  }

  isMatchedFavorite(): boolean {
    return this.information.favorite;
  }
}

export default Restaurant;
