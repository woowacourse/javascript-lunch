/**
 * local에 저장된 key의 value 값을 array로 반환
 * @return {Array}
 */
const RestaurantDataProvider = {
  execute() {
    const restaurants = localStorage.getItem('restaurants');
    const allRestaurants = JSON.parse(restaurants ?? '');

    return allRestaurants;
  },
};

export default RestaurantDataProvider;
