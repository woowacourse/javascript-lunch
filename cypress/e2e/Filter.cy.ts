import { RESTAURANTS_DB_KEY } from '@/constants/Condition';
import { IRestaurant } from '@/types/Restaurant';

describe('필터링 작동 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('처음 홈페이지를 열면 카테고리 필터링이 렌더링된다.', () => {
    cy.get('.tab-menu').should('exist');
    const $categoryFilter = cy.get('#category-filter');
    $categoryFilter.should('exist');
  });

  it('처음 홈페이지를 열면 정렬 필터링이 렌더링된다.', () => {
    const $sortingFilter = cy.get('#sorting-filter');
    $sortingFilter.should('exist');
  });

  it('처음 홈페이지를 열면 전체 음식점이 이름순으로 정렬되어 있다', () => {
    const sortedAllRestaurants = JSON.parse(localStorage.getItem(RESTAURANTS_DB_KEY) || '[]').sort(
      (a: IRestaurant, b: IRestaurant) => a.name.localeCompare(b.name),
    );

    cy.get('.restaurant').each(($restaurant, index) => {
      const restaurantName = $restaurant.find('.restaurant__name').text();
      expect(restaurantName).to.equal(sortedAllRestaurants[index].name);
    });
  });
});
