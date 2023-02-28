import { RestaurantType } from "./types";

class Restaurant {
  private _category: string;
  private _name: string;
  private _distance: number;
  private _description: string;
  private _link: string;

  constructor(restaurant: RestaurantType) {
    this._category = restaurant.category;
    this._name = restaurant.name;
    this._distance = restaurant.distance;
    this._description = restaurant.description;
    this._link = restaurant.link;
  }

  get category() {
    return this._category;
  }

  get name() {
    return this._name;
  }

  get distance() {
    return this._distance;
  }

  get description() {
    return this._description;
  }

  get link() {
    return this._link;
  }
}

export default Restaurant;
