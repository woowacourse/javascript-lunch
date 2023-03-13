describe('음식점 삭제 테스트', () => {
  it('음식점 요약정보를 누르면 세부정보가 열린다.', () => {
    cy.visit('http://localhost:8080');

    cy.get('.restaurant')
      .contains('바나프레소')
      .click();

    cy.get('#restaurant-detailed-modal .modal-container')
      .should('be.visible')
      .should('contain', '스탬프 적립해주세요');
  });

  it('음식점 세부정보에서 삭제하기를 누르면 확인창이 열리고 최종적으로 삭제한다.', () => {
    cy.visit('http://localhost:8080');

    cy.get('.restaurant')
      .contains('바나프레소')
      .click();
      
    cy.get('#restaurant-detailed-modal .button--secondary')
      .click();

    cy.get('#confirm-delete-modal .modal-container')
      .should('be.visible')
      .should('contain', '바나프레소');

    cy.get('#confirm-delete-modal .button--secondary')
      .click();

    cy.get('.restaurant-list-container')
      .should('not.contain', '바나프레소');
  });
});
