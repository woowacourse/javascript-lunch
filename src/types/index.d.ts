type Icategory = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";

type IAll = "전체";

type Idistance = 5 | 10 | 15 | 20 | 30;

export interface Irestaurant {
  category: Icategory;
  name: string;
  distance: Idistance;
  description?: string;
  link?: string;
}

// export interface IrestaurantState {
//   category: Icategory;
//   name?: string;
//   distance?: Idistance;
//   description?: string;
//   link?: string;
// }

export interface IrestaurantList {
  // addRestaurant: (restaurant: Irestaurant) => void;

  sortByName: (restaurantList: Irestaurant[]) => Irestaurant[];

  sortByDistance: (restaurantList: Irestaurant[]) => Irestaurant[];

  filterByCategory: (
    category: Icategory,
    restaurantList: Irestaurant[],
  ) => Irestaurant[];
}

interface IcategoryInfo {
  category: string;
  categoryImg: string;
}
