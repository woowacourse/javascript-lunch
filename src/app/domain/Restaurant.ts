import { Category, DistanceByWalk } from '../enum/enums';
import type { RestaurantDataType } from '../type/restaurantTypes';

type RestaurantType = RestaurantDataType & {
  id: string;
};

class Restaurant {
  private id: string;
  private name: string;
  private category: Category;
  private distanceByWalk: DistanceByWalk;
  private description: string;
  private referenceUrl: string;
  private favorite: boolean;

  constructor({
    id,
    name,
    category,
    distanceByWalk,
    description = '',
    referenceUrl = '',
    favorite = false,
  }: RestaurantType) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.distanceByWalk = distanceByWalk;
    this.description = description;
    this.referenceUrl = referenceUrl;
    this.favorite = favorite;
  }

  getId(): string {
    return this.id;
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

  updateFavorite(isFavorited: boolean) {
    this.favorite = isFavorited;
  }

  isMatchedCategory(category: Category): boolean {
    return category === this.category;
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      distanceByWalk: this.distanceByWalk,
      description: this.description,
      referenceUrl: this.referenceUrl,
      favorite: this.favorite,
    };
  }
}

export default Restaurant;
