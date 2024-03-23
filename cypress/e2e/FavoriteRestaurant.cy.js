describe('음식점 즐겨찾기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('즐겨찾기 버튼을 클릭하면 아이콘이 lined(빈 별)에서 filled(채워진 별)로 변경된다.', () => {
    cy.get('#favorite-button').within(() => {
      cy.get('.favorite-icon').should(
        'have.attr',
        'src',
        'http://localhost:8080/favorite-icon-lined.png',
      );

      cy.get('.favorite-icon').click();
      cy.get('.favorite-icon').should(
        'have.attr',
        'src',
        'http://localhost:8080/favorite-icon-filled.png',
      );
    });
  });

  it('자주 가는 음식점 탭을 클릭하면 해당 탭이 활성화되고, 자주 가는 음식점 목록이 표시된다.', () => {
    cy.get('#favorite-restaurants').click();
    cy.get('#favorite-restaurants').should('have.class', 'active');

    cy.get('#all-restaurants').should('not.have.class', 'active');
    cy.get('.restaurant').should('have.length', 0);
  });
});
