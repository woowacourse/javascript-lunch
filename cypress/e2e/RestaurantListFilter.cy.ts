import { defaultRestaurantData } from '../fixtures/testRestaurantData';
import { Category, SortOrder } from '../../src/app/enum/enums';

describe('음식점 목록 필터링 테스트', () => {
  beforeEach(() => {
    cy.saveRestaurants(defaultRestaurantData).then(() => cy.visitHome());
  });

  it('홈페이지 화면에 카테고리 및 정렬 필터링 드롭박스가 존재해야 한다.', () => {
    cy.get('restaurant-list-filter').should('exist');
    cy.get('restaurant-list-filter > #category-filter').should('exist');
    cy.get('restaurant-list-filter > #sorting-filter').should('exist');
  });

  it('"자주 가는 음식점" 탭에서는 카테고리 및 정렬 필터링 드롭박스가 숨겨져야 한다.', () => {
    cy.get('button#tab-favorite-button').click();
    cy.get('restaurant-list-filter').should('have.class', 'disabled');
  });

  context('음식점 정렬 조건 테스트', () => {
    it('정렬 조건이 "이름순"인 경우 모든 음식점은 이름 순서대로 정렬되어야 한다.', () => {
      cy.get('restaurant-list-filter > #sorting-filter').select(SortOrder.이름순);

      const sortedNames = defaultRestaurantData.map((restaurant) => restaurant.name).sort((a, b) => a.localeCompare(b));
      cy.get('.restaurant').each((restaurantElement, index) => {
        const restaurantName = restaurantElement.find('h3.restaurant__name').text();
        expect(restaurantName).to.equal(sortedNames[index]);
      });
    });

    it('정렬 조건이 "거리순"인 경우 모든 음식점은 거리순 > 이름순 대로 정렬되어야 한다.', () => {
      cy.get('restaurant-list-filter > #sorting-filter').select(SortOrder.거리순);

      const sortedNames = defaultRestaurantData
        .sort((a, b) => {
          const compareResult = parseInt(a.distanceByWalk) - parseInt(b.distanceByWalk);
          return compareResult === 0 ? a.name.localeCompare(b.name) : compareResult;
        })
        .map((restaurant) => restaurant.name);

      cy.get('.restaurant').each((restaurantElement, index) => {
        const restaurantName = restaurantElement.find('h3.restaurant__name').text();
        expect(restaurantName).to.equal(sortedNames[index]);
      });
    });
  });

  context('음식점 카테고리별 필터링 테스트', () => {
    Object.keys(Category).forEach((category) => {
      it(`카테고리가 "${category}"로 선택되면 "${category}" 카테고리의 음식점만 나타나야 한다.`, () => {
        cy.get('restaurant-list-filter > #category-filter').select(category);

        cy.get('.restaurant').each((restaurantElement) => {
          const restaurantCategory = restaurantElement.find('img.category-icon').attr('alt');
          expect(restaurantCategory).to.equal(category);
        });
      });
    });
  });
});
