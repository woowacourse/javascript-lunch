/**
 * @jest-environment jsdom
 */
import Header from '../src/components/Header';
import AddModal from '../src/components/modal/AddModal';
import RestaurantFilter from '../src/components/RestaurantFilter';
import RestaurantsList from '../src/components/RestaurantsList';
import Restaurants from '../src/domain/Restaurants';
import InfoModal from '../src/components/modal/InfoModal';
import Tabbar from '../src/components/Tabbar';

import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

describe('컴포넌트 단위 테스트', () => {
  const yeoptoRestaurant = {
    category: '기타',
    name: '엽토네 떡볶이',
    distance: 5,
    description: 'undefined',
    link: 'undefined',
    id: 'a1234',
  };

  const doriRestaurant = {
    category: '한식',
    name: '도리네 집밥',
    distance: 15,
    description: 'undefined',
    link: 'undefined',
    id: 'a1235',
  };

  const restaurants = new Restaurants([yeoptoRestaurant, doriRestaurant]);

  document.body.innerHTML = `
    <header class="gnb"></header>
    <main></main>
  `;

  const $header = document.querySelector('.gnb');
  const $main = document.querySelector('main');

  const header = new Header($header);
  const addModal = new AddModal($main);
  const infoModal = new InfoModal(restaurants);
  const tabbar = new Tabbar($main);
  const restaurantFilter = new RestaurantFilter($main);
  const restaurantsList = new RestaurantsList($main, restaurants, infoModal);

  header.setEvent(
    addModal.render.bind(addModal),
    restaurantsList.setState.bind(restaurantsList),
    restaurants.add.bind(restaurants)
  );

  tabbar.setEvent(
    restaurantsList.render.bind(restaurantsList),
    restaurantsList.renderFavoriteRestaurant.bind(restaurantsList),
    restaurantFilter.openFilter.bind(restaurantFilter),
    restaurantFilter.closeFilter.bind(restaurantFilter)
  );

  restaurantFilter.setEvent(restaurantsList.render.bind(restaurantsList));

  restaurantsList.setEvent(restaurants.setFavoriteState.bind(restaurants));

  test('음식점 리스트에 음식점들이 렌더링이 됐는지 확인한다.', () => {
    const yeopto = screen.getByText('엽토네 떡볶이');
    const dori = screen.getByText('도리네 집밥');

    expect(yeopto).toBeInTheDocument();
    expect(dori).toBeInTheDocument();
  });

  test('모달 창이 정상적으로 팝업되는 지 확인한다.', () => {
    fireEvent.click(screen.getByAltText('음식점 추가'));

    expect(screen.getByText('새로운 음식점')).toBeInTheDocument();
  });
});
