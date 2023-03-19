import { Restaurant } from '../../domain/model/LunchRecommendation';
import { useState } from '../../utils/core';
import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { Nav } from './Nav';
import { NavFilter } from './NavFilter';
import { NavTab } from './NavTab';
import { RestaurantInfoModal } from './RestaurantInfoModal';
import { Restaurants } from './Restaurants';
import { useModal } from '../../utils/hooks/useModal';
import { RestaurantRegistrationModal } from './RestaurantRegistrationModal';
import { TAB } from '../../constants/lunchRecommendation';
import { useTab } from '../../utils/hooks/useTab';

interface RestaurantListContainerProps {
  isAddRestaurantModalOpen: boolean;
  closeAddRestaurantModal: VoidFunction;
}

function RestaurantListContainer(props: RestaurantListContainerProps) {
  const { isAddRestaurantModalOpen, closeAddRestaurantModal } = props;
  const [tab, setTabAll, setTabFavorite] = useTab(TAB.ALL);
  const [focusedRestaurant, setFocusedRestaurant] = useState<Restaurant | null>(null);
  const [isRestaurantInfoModalOpen, openRestaurantInfoModal, closeRestaurantInfoModal] =
    useModal(false);
  const {
    values: { restaurants, category, sortOption },
    handlers: {
      handleCategory,
      handleSortOption,
      handleFavoriteBtn,
      handleClickAddBtn,
      handleDeleteBtn,
    },
  } = useRestaurants(tab);

  function onClickRestaurant(restaurant: Restaurant) {
    setFocusedRestaurant(restaurant);
    openRestaurantInfoModal();
  }

  return `
    <main>
      ${Nav({
        NavTab: NavTab({ tab, setTabAll, setTabFavorite }),
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
        ? RestaurantRegistrationModal({ close: closeAddRestaurantModal, handleClickAddBtn })
        : ''
    }
      `;
}

export { RestaurantListContainer };
