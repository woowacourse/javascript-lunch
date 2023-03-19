import { Category, SortOption } from '../../constants/lunchRecommendation';
import {
  lunchRecommendation,
  Restaurant,
  RestaurantInfo,
} from '../../domain/model/LunchRecommendation';
import { useState } from '../core';
import { useBoolean } from './useBoolean';

const initialCategory = '전체';
const initialSortOption = '거리순';

function useRestaurants() {
  const [tab, setTabFavorite, setTabAll] = useBoolean(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(lunchRecommendation.getAllList());
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

  function tabAll() {
    setTabAll();
    setRestaurants(lunchRecommendation.getAllList());
  }

  function tabFavorite() {
    setTabFavorite();
    setRestaurants(lunchRecommendation.getFavoriteList());
  }

  return {
    values: { restaurants, category, sortOption, tab },
    handlers: {
      handleCategory,
      handleSortOption,
      handleClickAddBtn,
      handleFavoriteBtn,
      handleDeleteBtn,
      tabAll,
      tabFavorite,
    },
  };
}

export { useRestaurants };
