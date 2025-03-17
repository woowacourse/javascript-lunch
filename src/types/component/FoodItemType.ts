export interface FoodItemType {
  foodItem: FoodType;
  handleModal: (foodItem: FoodType) => void;
  handleTabButton: (event: Event, foodItem: FoodType) => void;
}

export interface FoodType {
  imgSrc: string;
  imgAlt: string;
  name: string;
  distance: string;
  description: string;
  link: string;
  favorite: boolean;
}
