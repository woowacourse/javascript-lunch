import restaurantList from '../fixtures/RestaurantList.json';

describe('점심 뭐 먹지 E2E 테스트', () => {
  beforeEach(() => {
    window.localStorage.setItem('restaurantList', JSON.stringify(restaurantList));
    cy.visit('http://localhost:8080');
  });

  it('처음 화면이 뜨면 헤더와 식당 추가 버튼 보인다.', () => {
    cy.get('.gnb').should('be.visible');
    cy.get('.gnb__button').should('be.visible');
  });

  it('처음 화면이 뜨면 모든 음식점/자주가는 음식점 내브바가 보인다.', () => {
    cy.get('#all-restaurant').should('be.visible');
    cy.get('#favorite-restaurant').should('be.visible');
  });

  it('처음 화면이 뜨면 필터링과 정렬 드롭다운 버튼이 보인다.', () => {
    cy.get('#category-filter').should('be.visible');
    cy.get('#sorting-filter').should('be.visible');
  });

  it('처음 화면이 뜨면 레스토랑 리스트가 보인다.', () => {
    cy.get('.restaurant').should('have.length', restaurantList.length);
  });
});
