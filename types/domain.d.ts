export interface Restaurant {
  id: number;
  category: string;
  name: string;
  distance: number;
  description?: string;
  link?: string;
  favorite: boolean;
}
