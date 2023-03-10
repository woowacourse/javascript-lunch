import { useBoolean } from '../../utils/hooks/useBoolean';
import { Header } from './Header';
import { AddFormModal } from './AddFormModal';
import { useEvents, useState } from '../../utils/core';
import { RestaurantDetail } from './RestaurantDetail';
import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { getFavoriteIconSrc } from '../../utils/common/getImageSrc';
import { RestaurantList } from './RestaurantList';
import { Nav } from './Nav';
import { Tab } from './Tab';

function App() {
  const [info, setInfo] = useState<RestaurantInfo>({
    id: 100,
    category: '한식',
    name: '예시',
    distance: 20,
  });

  const {
    values: { restaurants, category, sortOption, oftenOption },
    handlers: {
      handleCategory,
      handleSortOption,
      handleOftenTab,
      handleClickIcon,
      handleClickName,
      handleClickAddBtn,
      handleClickDeleteBtn,
    },
  } = useRestaurants();

  const [isOpen, open, close] = useBoolean(false);

  const [isOpenDetail, openDetail, closeDetail] = useBoolean(false);

  const [addEvent] = useEvents('.restaurant-list');

  addEvent('click', '.restaurant__name', (e) => {
    if (e.target instanceof HTMLElement) {
      const id = Number(e.target.id);
      setInfo(handleClickName(id));
      console.log(id);
      openDetail();
    }
  });

  addEvent('click', '.favorite-icon', (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.target.src = getFavoriteIconSrc(e.target.src);
      console.log(e.target.id);
      handleClickIcon(Number(e.target.id));
    }
  });

  return `
    ${Header({ open })}
    <main class="wrapper">
      ${Tab({ oftenOption, handleOftenTab })}
      <div class="contentWrapper">
        <div class="content ${!oftenOption ? 'active' : ''}" id="all">
          ${Nav({ category, sortOption, handleCategory, handleSortOption })}
          ${RestaurantList({ restaurants })}
        </div>
        <div class="content ${oftenOption ? 'active' : ''}" id="often">
          ${RestaurantList({ restaurants })}
        </div>
      </div>
    </main>

    ${isOpen ? AddFormModal({ close, handleClickAddBtn }) : ''}
    ${
      isOpenDetail
        ? RestaurantDetail({ info, closeDetail, handleClickIcon, handleClickDeleteBtn })
        : ''
    };
  `;
}

export { App };
