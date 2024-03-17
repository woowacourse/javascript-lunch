import { defaultRestaurantData } from '../fixtures/testRestaurantData';

describe('음식점 상세 정보 모달 테스트', () => {
  beforeEach(() => {
    cy.saveRestaurants(defaultRestaurantData).then(() => cy.visitHome());
  });

  it('음식점 목록 화면에서 음식점 항목을 클릭하면 상세 정보 모달이 나타난다.', () => {
    cy.get('.restaurant__info').first().click();
    cy.get('dialog#restaurant-detail-modal').should('have.attr', 'open');
  });

  it('상세 정보 모달의 배경 영역, 즉 모달의 바깥 영역을 누르면 모달이 닫힌다.', () => {
    cy.get('.restaurant__info').first().click();
    cy.get('dialog#restaurant-detail-modal').click({ force: true });
    cy.get('dialog#restaurant-detail-modal').should('have.not.attr', 'open');
  });

  it('모달 하단의 "삭제하기" 버튼을 누르면 해당 음식점이 삭제되고 모달이 닫힌다.', () => {
    cy.get('.restaurant__info')
      .first()
      .find('h3.restaurant__name')
      .invoke('text')
      .then((restaurantName) => {
        cy.get('.restaurant__info').first().click();
        cy.get('button#restaurant-detail-delete-button').click();
        cy.get('restaurant-list').should('not.contain', restaurantName);
      });
  });

  it('모달 하단의 "닫기" 버튼을 누르면 모달이 닫힌다.', () => {
    cy.get('.restaurant__info').first().click();
    cy.get('button#restaurant-detail-close-button').click();
    cy.get('dialog#restaurant-detail-modal').should('have.not.attr', 'open');
  });
});
