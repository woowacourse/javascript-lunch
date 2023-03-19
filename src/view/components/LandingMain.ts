import { Restaurant } from './../../domain/model/LunchRecommendation';
import { useState } from '../../utils/core';
import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { Nav } from './Nav';
import { NavFilter } from './NavFilter';
import { NavTab } from './NavTab';
import { RestaurantInfoModal } from './RestaurantInfoModal';
import { Restaurants } from './Restaurants';
import { useModal } from '../../utils/hooks/useModal';
import { AddRestaurantModal } from './AddRestaurantModal';

interface LandingMain {
  isAddRestaurantModalOpen: boolean;
  closeAddRestaurantModal: VoidFunction;
}

function LandingMain(props: LandingMain) {
  const { isAddRestaurantModalOpen, closeAddRestaurantModal } = props;
  const [focusedRestaurant, setFocusedRestaurant] = useState<Restaurant | null>(null);
  const [isRestaurantInfoModalOpen, openRestaurantInfoModal, closeRestaurantInfoModal] =
    useModal(false);
  const {
    values: { restaurants, category, sortOption, tab },
    handlers: {
      handleCategory,
      handleSortOption,
      handleFavoriteBtn,
      handleClickAddBtn,
      handleDeleteBtn,
      tabAll,
      tabFavorite,
    },
  } = useRestaurants();

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
    ${
      isAddRestaurantModalOpen
        ? AddRestaurantModal({ close: closeAddRestaurantModal, handleClickAddBtn })
        : ''
    }
      `;
}

export { LandingMain };
