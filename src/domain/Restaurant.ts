import { ILocation } from '../interface/Interface';
import type { Category, MinutesWalk } from '../constants/typings';

class Restaurant implements ILocation {
  private name: string;
  private category: Category;
  private minutesWalk: MinutesWalk;
  private description?: string;
  private referenceUrl?: string;

  constructor({
    name,
    category,
    minutesWalk,
    description = '',
    referenceUrl = '',
  }: {
    name: string;
    category: Category;
    minutesWalk: MinutesWalk;
    description?: string;
    referenceUrl?: string;
  }) {
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

  getData() {
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
