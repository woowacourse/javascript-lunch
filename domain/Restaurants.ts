type PickValue<T, K extends keyof T> = Pick<T, K>[K];

export type Category = '한식' | '중식' | '일식' | '양식' | '기타' | '카테고리';

export interface RestaurantInfo {
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

interface IRestaurants {
  list: IRestaurant[];
  add(restaurant: IRestaurant): void;
  filterByCategory(category: Category): IRestaurant[];
  sortByName(): IRestaurant[];
  sortByDistance(): IRestaurant[];
  getList(): IRestaurant[];
}

class Restaurant implements IRestaurant {
  readonly info: RestaurantInfo = {
    name: '',
    category: '카테고리',
    distance: 0,
    description: '',
    link: '',
  };

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

class Restaurants implements IRestaurants {
  readonly list: IRestaurant[] = [];

  constructor(list: IRestaurant[]) {
    this.list = list;
  }

  add(restaurant: IRestaurant): void {
    this.list.push(restaurant);
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

export { Restaurant, Restaurants };
