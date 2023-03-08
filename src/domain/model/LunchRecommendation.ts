import { addData } from '../../utils/common/localStorage';

import { Category, CATEGORY, NAME, SortOption } from '../../constants/lunchRecommendation';

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
  isOften?: boolean;
}

export interface IRestaurant {
  getSomeInfo<T extends keyof RestaurantInfo>(type: T): RestaurantInfo[T];
  toggleOften(): void;
}

interface ILunchRecommendation {
  add(restaurant: Omit<RestaurantInfo, 'id'>): void;
  delete(restaurantId: RestaurantInfo['id']): Restaurant[];
  renderBy(filterType: FilterType): Restaurant[];
  sortByName(list: Restaurant[]): Restaurant[];
  sortByDistance(list: Restaurant[]): Restaurant[];
  getList(): Restaurant[];
  addOften(restaurantId: RestaurantInfo['id']): void;
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

  toggleOften() {
    this.info.isOften = this.info.isOften ? false : true;
  }
}

export class LunchRecommendation implements ILunchRecommendation {
  private origin: Restaurant[] = [];

  constructor(infoList: RestaurantInfo[]) {
    this.origin = infoList.map((info) => new Restaurant(info));
  }

  add(restaurantInfo: Omit<RestaurantInfo, 'id' | 'isOften'>): void {
    const isEmptyList = this.origin.length === 0;

    const id = isEmptyList ? 0 : Math.max(...this.origin.map(({ info }) => info.id)) + 1;
    const isOften = false;

    this.origin.push(new Restaurant({ ...restaurantInfo, id, isOften }));
    addData(this.origin.map(({ info }) => info));
  }

  addOften(restaurantId: RestaurantInfo['id']): void {
    const selectedRestaurant = this.origin[restaurantId];
    selectedRestaurant.toggleOften();
    addData(this.origin.map(({ info }) => info));
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
    const sorted = sortOption === NAME ? this.sortByName(filtered) : this.sortByDistance(filtered);

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

  getList() {
    return this.origin;
  }
}
