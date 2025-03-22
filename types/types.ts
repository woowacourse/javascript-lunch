export interface RestaurantType {
  id: number;
  imgUrl: string;
  category: string;
  name: string;
  distance: number;
  description?: string;
  link?: string;
}
