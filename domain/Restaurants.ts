type PickValue<T, K extends keyof T> = Pick<T, K>[K];

interface RestaurantInfo {
  name: string;
  category: string;
  distance: number;
  description?: string;
  link?: string;
}

interface IRestaurant {
  info: RestaurantInfo;
  getSomeInfo<T extends keyof RestaurantInfo>(type: T): RestaurantInfo[T];
  getInfo(): RestaurantInfo;
}

interface IRestaurants {
  list: IRestaurant[];
  add(restaurant: IRestaurant): void;
  filterByCategory(category: RestaurantInfo['category']): IRestaurant[];
  getList(): IRestaurant[];
}

class Restaurant implements IRestaurant {
  readonly info: RestaurantInfo = {
    name: '',
    category: '',
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

  add(restaurant: IRestaurant): void {
    this.list.push(restaurant);
  }

  filterByCategory(category: string): IRestaurant[] {
    return this.list.filter((restaurant) => restaurant.info.category === category);
  }

  getList() {
    return this.list;
  }
}

export { Restaurant, Restaurants };
