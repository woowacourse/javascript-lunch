export default interface RestaurantType {
  category: string;
  name: string;
  distance: number;
  description?: string;
  link?: string;
  isFavorite: boolean;
}
