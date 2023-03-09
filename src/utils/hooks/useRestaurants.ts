import { Category, SortOption } from '../../constants/lunchRecommendation';
import {
  LunchRecommendation,
  Restaurant,
  RestaurantInfo,
} from '../../domain/model/LunchRecommendation';
import { getData } from '../common/localStorage';
import { useState } from '../core';

const lunchRecommendation = new LunchRecommendation(getData());

function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(lunchRecommendation.getList());
  const [oftenRestaurants, setOftenRestaurants] = useState<Restaurant[]>(
    lunchRecommendation.getOftenList()
  );
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

  function handleClickAddBtn(restaurantInfo: RestaurantInfo) {
    lunchRecommendation.add(restaurantInfo);
    setRestaurants(lunchRecommendation.getList());
  }

  function handleClickOftenBtn(restaurantId: RestaurantInfo['id']) {
    lunchRecommendation.addOften(restaurantId);
    setRestaurants(lunchRecommendation.getList());
    setOftenRestaurants(lunchRecommendation.getOftenList());
  }

  return {
    values: { restaurants, oftenRestaurants, category, sortOption },
    handlers: { handleCategory, handleSortOption, handleClickAddBtn, handleClickOftenBtn },
  };
}

export { useRestaurants };
