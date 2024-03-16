import { RESTAURANTS_DB_KEY } from '@/constants/Condition';

//
describe('음식점 리스트 불러오기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('페이지에 접속하면 음식점 리스트를 로컬스토리지에 담긴 음식점 데이터의 개수만큼 잘 렌더링 한다.', () => {
    cy.get('.restaurant-list').should('exist');
    cy.get('.restaurant').should(
      'have.length',
      JSON.parse(localStorage.getItem(RESTAURANTS_DB_KEY) || '[]').length,
    );
  });

  it('음식점 아이템에는 카테고리, 이름, 거리, 설명, 즐겨찾기 버튼이 모두 렌더링 된다.', () => {
    cy.get('.restaurant').then(($restaurant) => {
      cy.wrap($restaurant).find('category-icon');
      cy.wrap($restaurant).find('.restaurant__name');
      cy.wrap($restaurant).find('.restaurant__distance');
      cy.wrap($restaurant).find('.restaurant__description');
      cy.wrap($restaurant).find('.favorite-button');
    });
  });
});
