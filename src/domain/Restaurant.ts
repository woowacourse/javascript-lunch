import { Category, DistanceByWalk } from '../enum/enums';
import type { RestaurantDataType } from '../type/restaurantDataType';

class Restaurant {
  private name: string;
  private category: Category;
  private distanceByWalk: DistanceByWalk;
  private description: string;
  private referenceUrl: string;
  private favorite: boolean;

  constructor({
    name,
    category,
    distanceByWalk,
    description = '',
    referenceUrl = '',
    favorite = false,
  }: RestaurantDataType) {
    this.name = name;
    this.category = category;
    this.distanceByWalk = distanceByWalk;
    this.description = description;
    this.referenceUrl = referenceUrl;
    this.favorite = favorite;
  }

  getName(): string {
    return this.name;
  }

  getDistanceByWalk(): DistanceByWalk {
    return this.distanceByWalk;
  }

  isFavorite() {
    return this.favorite;
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
    return this.isFavorite();
  }

  isMatchedCategory(category: Category): boolean {
    return category === this.category;
  }

  getData() {
    return {
      name: this.name,
      category: this.category,
      distanceByWalk: this.distanceByWalk,
      description: this.description,
      referenceUrl: this.referenceUrl,
    };
  }
}

export default Restaurant;
