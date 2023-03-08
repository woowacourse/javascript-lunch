/**
 * @jest-environment jsdom
 */
import Header from '../src/components/Header';
import Modal from '../src/components/Modal';
import RestaurantFilter from '../src/components/RestaurantFilter';
import RestaurantsList from '../src/components/RestaurantsList';
import Restaurants from '../src/domain/Restaurants';

import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

describe('컴포넌트 단위 테스트', () => {
  const yeoptoRestaurant = {
    category: '기타',
    name: '엽토네 떡볶이',
    distance: 5,
  };

  const doriRestaurant = {
    category: '한식',
    name: '도리네 집밥',
    distance: 15,
  };

  const restaurants = new Restaurants([yeoptoRestaurant, doriRestaurant]);

  document.body.innerHTML = `
    <header class="gnb"></header>
    <main></main>
  `;

  const header = new Header();
  const restaurantFilter = new RestaurantFilter();
  const restaurantsList = new RestaurantsList(restaurants);
  const modal = new Modal(restaurants);

  header.setModalOpenEvent(modal.render.bind(modal));
  restaurantFilter.setEvent(restaurantsList.render.bind(restaurantsList));
  modal.setSubmitEvent(restaurantsList.render.bind(restaurantsList));

  test('음식점 리스트에 음식점들이 렌더링이 됐는지 확인한다.', () => {
    const yeopto = screen.getByText('엽토네 떡볶이');
    const dori = screen.getByText('도리네 집밥');

    expect(yeopto).toBeInTheDocument();
    expect(dori).toBeInTheDocument();
  });

  test('모달 창이 정상적으로 팝업되는 지 확인한다.', () => {
    fireEvent(
      screen.getByAltText('음식점 추가'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    const modalTitle = screen.getByText('새로운 음식점');
    expect(modalTitle).toBeInTheDocument();
  });
});
