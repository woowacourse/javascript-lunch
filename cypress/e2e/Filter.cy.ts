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
    cy.fixture('restaurantList.json').then((restaurantList: IRestaurant[]) => {
      const $addModalButton = cy.get('.gnb__button');
      const $addModal = cy.get('#add-modal');

      restaurantList.forEach((restaurant: IRestaurant) => {
        $addModalButton.click();

        cy.get('#category').select(restaurant.category);
        cy.get('#name').type(restaurant.name);
        cy.get('#distance').select(restaurant.distance);
        cy.get('#description').type(restaurant.description || '');
        cy.get('#link').type(restaurant.link || '');

        const $addButton = $addModal.get('#add-button');
        $addButton.click();
      });

      const sortedAllRestaurants = [...restaurantList].sort((a: IRestaurant, b: IRestaurant) =>
        a.name.localeCompare(b.name),
      );

      cy.get('.restaurant').each(($restaurant, index) => {
        const restaurantName = $restaurant.find('.restaurant__name').text();
        cy.log(restaurantList[index].name);
        expect(restaurantName).to.equal(sortedAllRestaurants[index].name);
      });
    });
  });
});
