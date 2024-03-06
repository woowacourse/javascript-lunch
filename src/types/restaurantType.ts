import { CategoryEnum } from '../constants';

export type Category = keyof typeof CategoryEnum;

export type Distance = 5 | 10 | 15 | 20 | 30;

export interface RestaurantInfo {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
  like?: boolean;
}

// class RestaurantList {
//   private restaurants: Restaurant[] = InitialRestaurantData;

//   constructor() {}

//   saveLocalStorage() {
//     localStorage.setItem(
//       StorageKeyEnum.restaurants,
//       JSON.stringify(this.restaurants),
//     );
//   }
// }
