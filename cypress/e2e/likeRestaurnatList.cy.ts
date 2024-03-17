describe('자주가는 음식점 Section에 대한 테스트', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    cy.visit('/');
  });

  it('like-star 누른 음식점 Like Section에 추가 되었는지 테스트', () => {
    cy.get('.restaurant[data-id="1"] .like-star').click();
    cy.get('.restaurant[data-id="3"] .like-star').click();
    cy.get('.restaurant[data-id="5"] .like-star').click();
    cy.get('.restaurant-like-container').children().eq(1).click();
    cy.get('.restaurant-list')
      .children()
      .each((restaurantCard: any) => {
        const dataId = Cypress.$(restaurantCard).attr('data-id');
        expect(['1', '3', '5']).to.include(dataId);
      });
  });
});
