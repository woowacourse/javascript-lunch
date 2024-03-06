import { IRestaurant } from '../interface/Interface';
import type { Category, MinutesWalk } from '../constants/Type';

class Restaurant {
  private name: string;
  private category: Category;
  private minutesWalk: MinutesWalk;
  private description?: string;
  private referenceUrl?: string;

  constructor({ name, category, minutesWalk, description = '', referenceUrl = '' }: IRestaurant) {
    this.name = name;
    this.category = category;
    this.minutesWalk = minutesWalk;
    this.description = description;
    this.referenceUrl = referenceUrl;
  }

  getName(): string {
    return this.name;
  }

  getMinutesWalk(): MinutesWalk {
    return this.minutesWalk;
  }

  getData(): IRestaurant {
    return {
      name: this.name,
      category: this.category,
      minutesWalk: this.minutesWalk,
      description: this.description,
      referenceUrl: this.referenceUrl,
    };
  }

  isMatchedCategory(category: Category): boolean {
    return category === this.category;
  }
}

export default Restaurant;
