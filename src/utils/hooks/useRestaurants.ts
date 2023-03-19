import { Category, SortOption, TAB, Tab } from '../../constants/lunchRecommendation';
import {
  lunchRecommendation,
  Restaurant,
  RestaurantInfo,
} from '../../domain/model/LunchRecommendation';
import { useEffect, useState } from '../core';

const initialCategory = '전체';
const initialSortOption = '거리순';

function useRestaurants(tab: Tab) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(getRestaurantsByTab(tab));
  const [category, setCategory] = useState<Category>(initialCategory);
  const [sortOption, setSortOption] = useState<SortOption>(initialSortOption);

  function handleCategory(category: Category) {
    setCategory(category);
    setRestaurants(lunchRecommendation.renderBy({ category, sortOption }));
  }

  function handleSortOption(sortOption: SortOption) {
    setSortOption(sortOption);
    setRestaurants(lunchRecommendation.renderBy({ category, sortOption }));
  }

  function handleClickAddBtn(restaurantInfo: Omit<RestaurantInfo, 'id'>) {
    const isSuccess = lunchRecommendation.add(restaurantInfo);

    if (isSuccess) setRestaurants(lunchRecommendation.renderBy({ category, sortOption }));
  }

  function handleFavoriteBtn(id: RestaurantInfo['id']) {
    lunchRecommendation.toggleFavorite(id);
    setRestaurants(lunchRecommendation.getAllList());
  }

  function handleDeleteBtn(id: RestaurantInfo['id']) {
    lunchRecommendation.delete(id);
    setRestaurants(lunchRecommendation.renderBy({ category, sortOption }));
  }

  function getRestaurantsByTab(tab: Tab) {
    switch (tab) {
      case TAB.FAVORITE:
        return lunchRecommendation.getFavoriteList();

      case TAB.ALL:
      default:
        return lunchRecommendation.getAllList();
    }
  }

  useEffect(() => {
    setRestaurants(getRestaurantsByTab(tab));
  }, [tab]);

  return {
    values: { restaurants, category, sortOption, tab },
    handlers: {
      handleCategory,
      handleSortOption,
      handleClickAddBtn,
      handleFavoriteBtn,
      handleDeleteBtn,
    },
  };
}

export { useRestaurants };
