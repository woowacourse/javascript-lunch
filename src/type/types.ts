export interface RestaurantType {
  number: number;
  category: '한식' | '중식' | '일식' | '양식' | '아시안' | '기타';
  name: string;
  distance: '5' | '10' | '15' | '20' | '30';
  description: string;
  link: string;
  isFavorite: boolean;
}
