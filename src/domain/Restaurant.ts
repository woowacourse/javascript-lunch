import Validation from './Validation';

export interface RestaurantProps {
  category: string;
  name: string;
  distance: number;
  description?: string | null;
  referenceUrl?: string | null;
}

export type RestaurantCategory = (typeof Restaurant.CATEGORIES)[number];

export type RestaurantDistance = (typeof Restaurant.DISTANCES)[number];

class Restaurant {
  static readonly CATEGORIES = ['한식', '중식', '일식', '양식', '아시안', '기타'] as const;

  static readonly DISTANCES = [5, 10, 15, 20, 30] as const;

  private readonly category: RestaurantCategory;

  private readonly name: string;

  private readonly distance: RestaurantDistance;

  private readonly description: string | null;

  private readonly referenceUrl: string | null;

  constructor({ category, name, distance, description, referenceUrl }: RestaurantProps) {
    this.validateCategory(category);
    this.validateName(name);
    this.validateDistance(distance);

    this.category = category;
    this.name = name;
    this.distance = distance;
    this.description = description?.trim() || null;
    this.referenceUrl = referenceUrl?.trim() || null;
  }

  isMatchCategory(searchCategory: string) {
    return this.category === searchCategory;
  }

  getName() {
    return this.name;
  }

  getDistance() {
    return this.distance;
  }

  getDescription() {
    return this.description;
  }

  getCategory() {
    return this.category;
  }

  private validateCategory(category: string): asserts category is RestaurantCategory {
    if (!Restaurant.CATEGORIES.every((_category) => _category !== category)) {
      throw new Error(`카테고리는 ${Restaurant.CATEGORIES.join(', ')} 중 하나여야 합니다.`);
    }
  }

  private validateName(name: string) {
    Validation.validateRestaurantNameLength(name);
  }

  private validateDistance(distance: number): asserts distance is RestaurantDistance {
    if (!Restaurant.DISTANCES.every((_distance) => _distance !== distance)) {
      throw new Error(`거리는 ${Restaurant.DISTANCES.join('분, ')}분 중 하나여야 합니다.`);
    }
  }
}

export default Restaurant;
