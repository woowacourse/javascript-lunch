import { defaultRestaurantData } from '../fixtures/testRestaurantData';

describe('홈페이지 및 음식점 목록 화면 테스트', () => {
  beforeEach(() => {
    cy.saveRestaurants(defaultRestaurantData).then(() => cy.visitHome());
  });

  it('홈페이지 화면에 현재까지 저장된 음식점 목록이 노출되어야 한다.', () => {
    cy.get('.restaurant').should('have.length', defaultRestaurantData.length);
  });

  it('홈페이지 화면에 처음 접속했을 경우 "모든 음식점" 탭이 선택되어 있어야 한다.', () => {
    cy.get('restaurant-list-tab').should('exist');
    cy.get('restaurant-list-tab > #tab-all-button').should('have.class', 'active');
    cy.get('restaurant-list-tab > #tab-favorite-button').should('have.not.class', 'active');
  });

  it('"자주 가는 음식점" 탭을 누르면 자주 가는 음식점으로 등록된 항목이 노출되어야 한다.', () => {
    cy.selectTab('favorite');
    cy.get('.restaurant').should('have.length', 2);
    cy.get('.restaurant__favorite-button.favorited').should('have.length', 2);
  });
});
