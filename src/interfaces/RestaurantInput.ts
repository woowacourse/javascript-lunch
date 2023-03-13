export interface RestaurantInput {
  category: string;
  name: string;
  distance: string;
  description: string;
  link: string;
}

export interface Restaurant extends RestaurantInput {
  id: number;
  favorite: boolean;
}
