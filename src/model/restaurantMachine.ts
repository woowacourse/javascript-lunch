import { Category } from '../constants/enum.js';

interface IrestaurantInput {
  category: Category;
  name: string;
  distance: string;
  description?: string;
  link?: string;
}

const restaurantMachine = {
  addRestaurant(restaurantInput: IrestaurantInput): void {
    const originalRestaurantList: IrestaurantInput[] = JSON.parse(
      localStorage.getItem('restaurantList') || '[]'
    );

    JSON.stringify(originalRestaurantList.push(restaurantInput));
  },

  // 이름 길이

  // 설명 길이

  // 참고
};
