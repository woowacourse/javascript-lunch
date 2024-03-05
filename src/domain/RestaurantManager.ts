import { IRestaurant, Category } from "../domain/interface/IRestaurant";
export interface IRestaurantManager {
  add(newRestaurant: IRestaurant): void;
  getRestaurants(): IRestaurant[];
  sortByAscendingName(): IRestaurant[];
  sortByAscendingWalkingTime(): IRestaurant[];
  filteredRestaurants(category: Category): IRestaurant[];
}
export class RestaurantManager implements IRestaurantManager {
  #restaurants: IRestaurant[] = [];
  constructor(restaurants: IRestaurant[] = []) {
    this.#restaurants = restaurants;
  }
  add(newRestaurant: IRestaurant): void {
    const hasSameName = this.#restaurants.some(
      ({ name }) => name === newRestaurant.name
    );
    if (hasSameName) {
      throw new Error("[ERROR]");
    }
    this.#restaurants.push(newRestaurant);
  }
  getRestaurants(): IRestaurant[] {
    return [...this.#restaurants];
  }
  sortByAscendingName(): IRestaurant[] {
    throw new Error("Method not implemented.");
  }
  sortByAscendingWalkingTime(): IRestaurant[] {
    throw new Error("Method not implemented.");
  }
  filteredRestaurants(category: Category): IRestaurant[] {
    throw new Error("Method not implemented.");
  }
}
