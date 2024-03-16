import { Category, MinutesWalk } from '../constants/enums';
import { ILocation } from '../interface/interface';

class Restaurant {
  private name: string;
  private category: Category;
  private minutesWalk: MinutesWalk;
  private description?: string;
  private referenceUrl?: string;
  private favorite: boolean;

  constructor({ name, category, minutesWalk, description = '', referenceUrl = '', favorite = false }: ILocation) {
    this.name = name;
    this.category = category;
    this.minutesWalk = minutesWalk;
    this.description = description;
    this.referenceUrl = referenceUrl;
    this.favorite = favorite;
  }

  getName(): string {
    return this.name;
  }

  getCategory(): Category {
    return this.category;
  }

  getMinutesWalk(): MinutesWalk {
    return this.minutesWalk;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getReferenceUrl(): string | undefined {
    return this.referenceUrl;
  }

  getFavorite(): boolean {
    return this.favorite;
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
  }

  getData() {
    return {
      name: this.name,
      category: this.category,
      minutesWalk: this.minutesWalk,
      description: this.description,
      referenceUrl: this.referenceUrl,
      favorite: this.favorite,
    };
  }

  isMatchedCategory(category: Category): boolean {
    return category === this.category;
  }
}

export default Restaurant;
