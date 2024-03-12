import { Category, DistanceByWalk } from '../enum/enums';
import type { RestaurantData } from '../type/RestaurantData';

class Restaurant {
  private name: string;
  private category: Category;
  private distanceByWalk: DistanceByWalk;
  private description?: string;
  private referenceUrl?: string;

  constructor({ name, category, distanceByWalk, description = '', referenceUrl = '' }: RestaurantData) {
    this.name = name;
    this.category = category;
    this.distanceByWalk = distanceByWalk;
    this.description = description;
    this.referenceUrl = referenceUrl;
  }

  getName(): string {
    return this.name;
  }

  getDistanceByWalk(): DistanceByWalk {
    return this.distanceByWalk;
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

  isMatchedCategory(category: Category): boolean {
    return category === this.category;
  }
}

export default Restaurant;
