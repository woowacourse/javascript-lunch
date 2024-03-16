import { RESTAURANTS_DB_KEY } from '@/constants/Condition';
import { IRestaurant } from '@/types/Restaurant';

describe('탭과 필터링 동시 동작 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('카테고리 필터링(한식)이 적용된 상태에서 모든 음식점 탭을 클릭해도 필터가 유지되어 필터된 음식점만 나온다.', () => {
    cy.get('#category-filter').select('한식');
    cy.get('#all-tab').click();
    cy.get('.restaurant').then(($restaurant) => {
      const $categoryImg = $restaurant.find('img');
      const koreanCategoryImg = 'http://localhost:8080/category-korean.png';
      expect($categoryImg.attr('src')).to.equal(koreanCategoryImg);
    });
  });

  it('거리순 필터링이 적용된 상태에서 자주 가는 음식점 탭을 클릭해도 필터링이 유지되어 필터링된 음식점이 나온다.', () => {
    cy.get('#sorting-filter').select('거리순');
    cy.get('#favorite-tab').click();

    const sortedFavoriteRestaurant = JSON.parse(localStorage.getItem(RESTAURANTS_DB_KEY) || '[]')
      .sort((a: IRestaurant, b: IRestaurant) => {
        return a.distance - b.distance;
      })
      .filter((restaurant: IRestaurant) => restaurant.isFavorite);

    cy.get('.restaurant').each(($restaurant, index) => {
      const restaurantName = $restaurant.find('.restaurant__name').text();
      expect(restaurantName).to.equal(sortedFavoriteRestaurant[index].name);
    });
  });
});
