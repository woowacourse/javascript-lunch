import { Category } from '@res/constants/enum';

export default interface IRestaurantInput {
  category: string;
  name: string;
  distance: string;
  description: string;
  link: string;
}
