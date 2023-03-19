describe('점심 뭐 먹지 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport(390, 880);
  });

  it('새로운 음식점 추가하기', () => {
    cy.get('header button').click();

    cy.get('form #category').select('한식');
    cy.get('form #name').type('마초갈비');
    cy.get('form #distance').select('5');
    cy.get('form #description').type('점심 보쌈정식 최고입니다!');
    cy.get('form #link').type('www.macho.com');
    cy.get('form .button--primary').click();

    cy.get('.restaurant-list').contains('마초갈비').should('exist');
  });

  it('음식점을 클릭하고 삭제하기 버튼을 누르면 음식점이 삭제된다.', () => {
    cy.get('.restaurant-list').contains('이태리키친').click();
    cy.get('button').contains('삭제하기').click();
    cy.get('.restaurant-list').should('not.contain', '이태리키친');
  });

  it('별을 누르면 자주 가는 음식점을 추가한다.', () => {
    cy.get('.favorite-icon').first().click();
    cy.get('nav').contains('자주 가는 음식점').click();

    cy.get('.favorite-list').contains('농민 백암 순대').should('exist');
  });
});
