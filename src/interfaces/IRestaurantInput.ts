export interface IRestaurantInput {
  category: string;
  name: string;
  distance: string;
  description: string;
  link: string;
}

export interface IRestaurant extends IRestaurantInput {
  id: number;
  favorite: boolean;
}
