describe('점심뭐먹지 앱 e2e 테스트', () => {
  before(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport(390, 880);
  });

  it('새로운 음식점 추가하기', () => {
    cy.get('header button').click();

    cy.get('form #category').select('한식');
    cy.get('form #name').type('새로운 식당');
    cy.get('form #takeMinute').select('15');
    cy.get('form #description').type('맛있어요!');
    cy.get('form #link').type('www.google.com');
    cy.get('form #submit').click();

    cy.get('.restaurant-list').contains('새로운 식당');
    cy.get('.restaurant-list').click();
  });
});
