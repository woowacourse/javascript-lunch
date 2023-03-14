import Validation from './Validation';

export interface RestaurantProps {
  category: string;
  name: string;
  distanceByMinutes: number;
  description?: string;
  referenceUrl?: string;
  isFavorite?: boolean;
}

class Restaurant {
  static readonly CATEGORIES = ['한식', '중식', '일식', '양식', '아시안', '기타'] as const;

  static readonly DISTANCE_BY_MINUTES = [5, 10, 15, 20, 30] as const;

  private category: string;

  private name: string;

  private distanceByMinutes: number;

  private description?: string;

  private referenceUrl?: string;

  private isFavorite = false;

  constructor({ category, name, distanceByMinutes, description, referenceUrl }: RestaurantProps) {
    this.validateCategory(category);
    this.validateName(name);
    this.validateDistanceByMinutes(distanceByMinutes);

    this.category = category;
    this.name = name;
    this.distanceByMinutes = distanceByMinutes;
    this.description = description || undefined;
    this.referenceUrl = referenceUrl || undefined;
  }

  isMatchCategory(searchCategory: string) {
    return this.category === searchCategory;
  }

  getName() {
    return this.name;
  }

  getDistanceByMinutes() {
    return this.distanceByMinutes;
  }

  getDescription() {
    return this.description;
  }

  getCategory() {
    return this.category;
  }

  getReferenceUrl() {
    return this.referenceUrl;
  }

  getIsFavorite() {
    return this.isFavorite;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  private validateCategory(category: string) {
    if (!(Restaurant.CATEGORIES as readonly string[]).includes(category)) {
      throw new Error(`카테고리는 ${Restaurant.CATEGORIES.join(', ')} 중 하나여야 합니다.`);
    }
  }

  private validateName(name: string) {
    Validation.validateRestaurantNameLength(name);
  }

  private validateDistanceByMinutes(distanceByMinutes: number) {
    if (!(Restaurant.DISTANCE_BY_MINUTES as readonly number[]).includes(distanceByMinutes)) {
      throw new Error(
        `거리는 ${Restaurant.DISTANCE_BY_MINUTES.join('분, ')}분 중 하나여야 합니다.`,
      );
    }
  }
}

export default Restaurant;
