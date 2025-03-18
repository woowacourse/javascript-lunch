export interface Restaurant {
  category: string;
  categoryValue: string;
  nameValue: string;
  distanceValue: number;
  descriptionValue: string;
  link: string;
  favorite: boolean;
}

export interface SortProps {
  $restaurantList: HTMLUListElement;
  $restaurantItems: HTMLElement[];
}
