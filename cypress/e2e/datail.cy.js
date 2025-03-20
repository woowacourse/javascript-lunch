describe('음식점 상세 정보 및 삭제 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('음식점 상세 정보를 확인할 수 있다', () => {
    cy.get('.restaurant').first().click();
    cy.get('.modal .restaurant__name').should('be.visible');
  });

  it('음식점을 삭제하면 목록에서 사라지는지 확인', () => {
    cy.get('.restaurant-list')
      .children()
      .its('length')
      .then((initialLength) => {
        cy.get('.restaurant').first().click();
        cy.get('.modal button').contains('삭제하기').click({ force: true });
        cy.get('.modal--open').should('not.exist');
        cy.get('.restaurant-list')
          .children()
          .should('have.length', initialLength - 1);
      });
  });
});
