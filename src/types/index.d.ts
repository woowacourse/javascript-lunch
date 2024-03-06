type Icategory = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";

type Idistance = 5 | 10 | 15 | 20 | 30;

export interface Irestaurant {
  category: Icategory;
  name: string;
  distance: Idistance;
  description?: string;
  link?: string;
}

export interface IrestaurantList {
  restaurantList?: Irestaurant[];

  addRestaurant: (restaurant: Irestaurant) => void;

  sortByName: () => Irestaurant[];

  sortByDistance: () => Irestaurant[];

  filterByCategory: (category: Icategory) => Irestaurant[];
}

interface IcategoryInfo {
  category: string;
  categoryImg: string;
}
