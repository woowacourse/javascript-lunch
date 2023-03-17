import { Restaurant } from './../../domain/model/LunchRecommendation';
import { useState } from '../../utils/core';
import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { Nav } from './Nav';
import { NavFilter } from './NavFilter';
import { NavTab } from './NavTab';
import { RestaurantInfoModal } from './RestaurantInfoModal';
import { Restaurants } from './Restaurants';
import { useModal } from '../../utils/hooks/useModal';

function LandingMain() {
  const {
    values: { restaurants, category, sortOption, tab },
    handlers: {
      handleCategory,
      handleSortOption,
      handleFavoriteBtn,
      handleDeleteBtn,
      tabAll,
      tabFavorite,
    },
  } = useRestaurants();
  const [focusedRestaurant, setFocusedRestaurant] = useState<Restaurant | null>(null);
  const [isRestaurantInfoModalOpen, openRestaurantInfoModal, closeRestaurantInfoModal] =
    useModal(true);

  function onClickRestaurant(restaurant: Restaurant) {
    setFocusedRestaurant(restaurant);
    openRestaurantInfoModal();
  }

  return `
    <main>
      ${Nav({
        NavTab: NavTab({ tab, tabAll, tabFavorite }),
        NavFilter: !tab
          ? NavFilter({ category, sortOption, handleCategory, handleSortOption })
          : '',
      })}
      ${Restaurants({ restaurants, handleFavoriteBtn, onClick: onClickRestaurant })}
      ${
        isRestaurantInfoModalOpen && focusedRestaurant?.info
          ? RestaurantInfoModal({
              handleFavoriteBtn,
              handleDeleteBtn,
              info: focusedRestaurant.info,
              close: closeRestaurantInfoModal,
            })
          : ''
      }
    </main>
      `;
}

export { LandingMain };
