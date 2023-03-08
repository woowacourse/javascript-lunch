import { Category, SortOption } from '../../constants/lunchRecommendation';
import {
  LunchRecommendation,
  Restaurant,
  RestaurantInfo,
} from '../../domain/model/LunchRecommendation';
import { initMockData } from '../../mocks/restaurantsInfo';
import { getData } from '../common/localStorage';
import { useState } from '../core';

initMockData();
const lunchRecommendation = new LunchRecommendation(getData());

function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(lunchRecommendation.getList());
  const [category, setCategory] = useState<Category>('전체');
  const [sortOption, setSortOption] = useState<SortOption>('거리순');

  function handleCategory(category: Category) {
    setCategory(category);
    setRestaurants(lunchRecommendation.renderBy({ category, sortOption }));
  }

  function handleSortOption(sortOption: SortOption) {
    setSortOption(sortOption);
    setRestaurants(lunchRecommendation.renderBy({ category, sortOption }));
  }

  function handleClickAddBtn(restaurantInfo: Omit<RestaurantInfo, 'id'>) {
    lunchRecommendation.add(restaurantInfo);
    setRestaurants(lunchRecommendation.getList());
  }

  return {
    values: { restaurants, category, sortOption },
    handlers: { handleCategory, handleSortOption, handleClickAddBtn },
  };
}

export { useRestaurants };
