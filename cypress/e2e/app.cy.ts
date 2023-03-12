describe('점심 뭐 먹지 e2e 테스트', () => {
  it('새로운 음식점 추가하기', () => {
    cy.visit('http://localhost:8080/');
    cy.viewport(390, 880);

    cy.get('header button').click();

    cy.get('form #category').select('한식');
    cy.get('form #name').type('마초갈비');
    cy.get('form #distance').select('5');
    cy.get('form #description').type('점심 보쌈정식 최고입니다!');
    cy.get('form #link').type('www.macho.com');
    cy.get('form .button--primary').click();

    cy.get('.restaurant-list').contains('마초갈비').should('exist');
  });
});
