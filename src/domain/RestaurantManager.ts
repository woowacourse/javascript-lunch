import { IRestaurant, Category } from "../domain/interface/IRestaurant";

export interface IRestaurantManager {
  add(newRestaurant: IRestaurant): void;
  getRestaurants(): IRestaurant[];
  sortByAscendingName(): IRestaurant[];
  sortByAscendingWalkingTime(): IRestaurant[];
  filteredRestaurants(category: Category): IRestaurant[];
}

export class RestaurantManager implements IRestaurantManager {
  private restaurants: IRestaurant[] = [];

  constructor(restaurants: IRestaurant[] = []) {
    this.restaurants = restaurants;
  }

  add(newRestaurant: IRestaurant): void {
    const hasSameName = this.restaurants.some(
      ({ name }) => name === newRestaurant.name
    );
    if (hasSameName) {
      throw new Error("[ERROR]");
    }
    this.restaurants.push(newRestaurant);
  }

  getRestaurants(): IRestaurant[] {
    return [...this.restaurants];
  }

  sortByAscendingName(): IRestaurant[] {
    return [...this.restaurants].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  sortByAscendingWalkingTime(): IRestaurant[] {
    return [...this.restaurants].sort((a, b) => {
      if (a.walkingTime < b.walkingTime) return -1;
      if (a.walkingTime > b.walkingTime) return 1;

      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  filteredRestaurants(category: Category): IRestaurant[] {
    return [...this.restaurants].filter(
      (restaurant) => restaurant.category === category
    );
  }
}
