type PickValue<T, K extends keyof T> = Pick<T, K>[K];

export type Category = '한식' | '중식' | '일식' | '양식' | '기타' | '아시안' | '전체';
export type Filter = '이름순' | '거리순';

export interface RestaurantInfo {
  id: number;
  name: string;
  category: Category;
  distance: number;
  description?: string;
  link?: string;
}

export interface IRestaurant {
  info: RestaurantInfo;
  getSomeInfo<T extends keyof RestaurantInfo>(type: T): RestaurantInfo[T];
  getInfo(): RestaurantInfo;
}

interface ILunchRecommendation {
  list: Restaurant[];
  add(restaurant: Omit<RestaurantInfo, 'id'>): void;
  delete(restaurantId: RestaurantInfo['id']): Restaurant[];
  filterByCategory(category: Category): Restaurant[];
  sortByName(): Restaurant[];
  sortByDistance(): Restaurant[];
  getList(): Restaurant[];
}

class Restaurant implements IRestaurant {
  readonly info: RestaurantInfo;

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

  getInfo() {
    return this.info;
  }
}

class LunchRecommendation implements ILunchRecommendation {
  list: Restaurant[] = [];

  constructor(list: Restaurant[]) {
    this.list = list;
  }

  add(restaurantInfo: Omit<RestaurantInfo, 'id'>): void {
    const id = this.list.length + 1;
    this.list.push(new Restaurant({ ...restaurantInfo, id }));
  }

  delete(restaurantId: RestaurantInfo['id']): Restaurant[] {
    this.list = this.list.filter((restaurant) => restaurant.info.id !== restaurantId);

    return this.list;
  }

  filterByCategory(category: string): IRestaurant[] {
    return this.list.filter((restaurant) => restaurant.info.category === category);
  }

  sortByName(): IRestaurant[] {
    return this.list.sort(
      ({ info: { name: nameA } }: IRestaurant, { info: { name: nameB } }: IRestaurant) => {
        const upperA = nameA.toUpperCase();
        const upperB = nameB.toUpperCase();

        if (upperA < upperB) return -1;
        if (upperA > upperB) return 1;

        return 0;
      }
    );
  }

  sortByDistance(): IRestaurant[] {
    return this.list.sort(
      (
        { info: { distance: distanceA } }: IRestaurant,
        { info: { distance: distanceB } }: IRestaurant
      ) => {
        return distanceA - distanceB;
      }
    );
  }

  getList() {
    return this.list;
  }
}

export { Restaurant, LunchRecommendation };
