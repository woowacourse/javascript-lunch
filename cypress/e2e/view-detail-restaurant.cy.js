describe('음식점 상세 조회 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.viewport(1280, 1000);
  });

  it('음식점을 클릭하면 카테고리, 이름, 거리, 설명, 참고 링크를 확인할 수 있다.', () => {
    cy.get('.restaurant-list li').first().click();
    cy.get('.modal-container').should('be.visible');

    cy.get('.modal-container li').within(() => {
      cy.get('.restaurant__category').should('exist');
      cy.get('.restaurant__name').should('exist');
      cy.get('.restaurant__distance').should('exist');
      cy.get('.restaurant__detail__description').should('exist');
    });
  });
});
