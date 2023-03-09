import { Category, CATEGORY, SortOption, SORT_OPTIONS } from '../../constants/lunchRecommendation';
import { addData } from '../../utils/common/localStorage';
import Validator from '../../validation';

export interface FilterType {
  sortOption: SortOption;
  category: Category;
}

export interface RestaurantInfo {
  id: number;
  name: string;
  category: Category;
  distance: number;
  description?: string;
  link?: string;
  favorite: boolean;
}

export interface IRestaurant {
  getSomeInfo<T extends keyof RestaurantInfo>(type: T): RestaurantInfo[T];
}

interface ILunchRecommendation {
  add(restaurant: Omit<RestaurantInfo, 'id'>): boolean;
  delete(restaurantId: RestaurantInfo['id']): Restaurant[];
  renderBy(filterType: FilterType): Restaurant[];
  sortByName(list: Restaurant[]): Restaurant[];
  sortByDistance(list: Restaurant[]): Restaurant[];
  toggleFavorite(id: RestaurantInfo['id']): void;
  getAllList(): Restaurant[];
}

export class Restaurant implements IRestaurant {
  info: RestaurantInfo;

  constructor(info: RestaurantInfo) {
    const { name, category, distance } = info;
    if (name && category && Number.isInteger(distance) && distance >= 0) {
      this.info = info;
      return;
    }

    throw new Error();
  }

  getSomeInfo<T extends keyof RestaurantInfo>(type: T) {
    return this.info[type];
  }
}

export class LunchRecommendation implements ILunchRecommendation {
  private origin: Restaurant[] = [];

  constructor(infoList: RestaurantInfo[]) {
    this.origin = infoList.map((info) => new Restaurant(info));
  }

  add(restaurantInfo: Omit<RestaurantInfo, 'id'>): boolean {
    const id = Math.max(...this.origin.map(({ info }) => info.id)) + 1;
    const newRestaurant = { ...restaurantInfo, id };

    const { isValid } = Validator.Restaurant.info(newRestaurant, {
      onError: (error) => alert(error.message),
    });

    if (isValid) {
      this.origin.push(new Restaurant(newRestaurant));
      addData(this.origin.map(({ info }) => info));
    }

    return isValid;
  }

  delete(restaurantId: RestaurantInfo['id']): Restaurant[] {
    this.origin = this.origin.filter((restaurant) => restaurant.info.id !== restaurantId);

    return this.origin;
  }

  filterByCategory(list: Restaurant[], category: string): Restaurant[] {
    return list.filter((restaurant) => restaurant.info.category === category);
  }

  renderBy({ sortOption, category }: FilterType) {
    const filtered =
      category === CATEGORY.ALL ? this.origin : this.filterByCategory(this.origin, category);
    const sorted =
      sortOption === SORT_OPTIONS.NAME ? this.sortByName(filtered) : this.sortByDistance(filtered);

    return sorted;
  }

  sortByName(list: Restaurant[]): Restaurant[] {
    return list.sort(
      ({ info: { name: nameA } }: Restaurant, { info: { name: nameB } }: Restaurant) => {
        const upperA = nameA.toUpperCase();
        const upperB = nameB.toUpperCase();

        if (upperA < upperB) return -1;
        if (upperA > upperB) return 1;

        return 0;
      }
    );
  }

  sortByDistance(list: Restaurant[]): Restaurant[] {
    return list.sort(
      (
        { info: { distance: distanceA } }: Restaurant,
        { info: { distance: distanceB } }: Restaurant
      ) => {
        return distanceA - distanceB;
      }
    );
  }

  toggleFavorite(id: RestaurantInfo['id']) {
    this.origin = this.origin.map((restaurant) => {
      if (restaurant.info.id === id) restaurant.info.favorite = !restaurant.info.favorite;

      return restaurant;
    });
    addData(this.origin.map(({ info }) => info));
  }

  getAllList() {
    return this.origin;
  }

  getFavoriteList() {
    return this.origin.filter((restaurant) => restaurant.info.favorite);
  }
}
