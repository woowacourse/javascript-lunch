import { CATEGORIES, RESTAURANTS_DB_KEY } from '@/constants/Condition';
import { Category, IRestaurant } from '@/types/Restaurant';

describe('탭 작동 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('처음 홈페이지를 열면 탭이 렌더링되고, 두 탭 중에 모든 음식점만이 선택된 상태로 나온다.', () => {
    cy.get('.tab-menu').should('exist');
    cy.get('.tab-menu').then(($tabMenu) => {
      $tabMenu.find('#all-tab');
      $tabMenu.find('#favorite-tab');
    });

    cy.get('#all-tab').should('have.class', 'active');
    cy.get('#favorite-tab').should('have.not.class', 'active');
  });

  it('자주 가는 음식점을 클릭하면 favorite 요소가 true인 음식점들만 나온다.', () => {
    cy.get('#favorite-tab').click();

    cy.get('.restaurant').then(($restaurant) => {
      const $star = $restaurant.find('.star');
      if ($star.length > 0) {
        const filledStarImg = 'http://localhost:8080/favorite-icon-filled.png';
        expect($star.attr('src')).to.equal(filledStarImg);
      }
    });
  });

  it('모든 음식점 탭을 클릭하면 로컬 스토리지의 모든 음식점을 나온다.', () => {
    cy.get('#favorite-tab').click();
    cy.get('#all-tab').click();

    cy.get('.restaurant').should(
      'have.length',
      JSON.parse(localStorage.getItem(RESTAURANTS_DB_KEY) || '[]').length,
    );
  });

  it('카테고리 필터링에서 카테고리를 누르면 해당 카테고리 음식점들만 나온다.', () => {
    const CATEGORIES_KEYS: Category[] = ['한식', '중식', '일식', '아시안', '양식', '기타'];
    CATEGORIES_KEYS.forEach((category: Category) => {
      cy.get('#category-filter').select(category);
      cy.get('.restaurant').then(($restaurant) => {
        const $categoryImg = $restaurant.find('img');
        const koreanCategoryImg = `http://localhost:8080/category-${CATEGORIES[category]}.png`;
        expect($categoryImg.attr('src')).to.equal(koreanCategoryImg);
      });
    });
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

  it('거리순 필터링이 적용된 상태에서 자주 가는 음식점 탭을 클릭하면 필터링된 음식점이 나온다.', () => {
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
