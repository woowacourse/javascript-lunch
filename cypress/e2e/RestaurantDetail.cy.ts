describe('음식점 상세 정보 테스트', () => {
  it('음식점 상세 정보와 관련된 e2e 테스트', () => {
    cy.visit('http://localhost:8080/');

    cy.contains('도스타코스').click();
    cy.get('.modal-container').should('be.visible');

    cy.contains('닫기').click();
    cy.get('.restaurant-list-container').should('be.visible');

    cy.contains('잇쇼우').click();
    cy.contains('삭제하기').click();
    cy.contains('잇쇼우').should('not.exist');
  });
});
