export type BaseData = { id: number };

export interface Restaurant extends baseData {
  id: number;
  category: string;
  name: string;
  distance: number;
  description?: string;
  link?: string;
  favorite: boolean;
}

export interface RestaurantState {
  sort: string;
  category: string;
  isFavoriteTab: boolean;
}

export type RestaurantInput = Omit<Restaurant, 'id' | 'favorite'>;
