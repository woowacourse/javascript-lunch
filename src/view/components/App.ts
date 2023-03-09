import { useBoolean } from '../../utils/hooks/useBoolean';
import { Header } from './Header';
import { LandingMain } from './LandingMain';
import { AddFormModal } from './AddFormModal';
import { useEvents, useState } from '../../utils/core';
import { RestaurantDetail } from './RestaurantDetail';
import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { RestaurantInfo } from '../../domain/model/LunchRecommendation';

function App() {
  const [info, setInfo] = useState<RestaurantInfo>({
    id: 100,
    category: '한식',
    name: '예시',
    distance: 20,
  });

  const {
    handlers: { handleClickName },
  } = useRestaurants();

  const [isOpen, open, close] = useBoolean(false);

  const [isOpenDetail, openDetail, closeDetail] = useBoolean(false);

  const [addEvent] = useEvents('main');

  addEvent('click', '.restaurant__name', (e) => {
    if (e.target instanceof HTMLElement) {
      const id = Number(e.target.id);
      setInfo(handleClickName(id));
      console.log(id);
      openDetail();
    }
  });

  return `
    ${Header({ open })}
    ${LandingMain()}
    ${isOpen ? AddFormModal({ close }) : ''}
    ${isOpenDetail ? RestaurantDetail({ info, closeDetail }) : ''};
  `;
}

export { App };
