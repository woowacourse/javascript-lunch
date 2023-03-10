describe('자주 가는 음식점 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport(1680, 965);
  });

  it('웹 페이지에 처음 방문했을 때 디폴트 데이터가 음식점 목록에 포함되어 있다.', () => {
    cy.get('.restaurant')
      .first()
      .within(() => {
        cy.get('.category-icon').should('have.attr', 'src', './category-korean.png');
        cy.get('.restaurant__name').should('have.text', '덮밥이맛있는집');
        cy.get('.restaurant__distance').should('contain.text', '15분');
        cy.get('.restaurant__description').should(
          'contain.text',
          '영동칼국수집 옆에 있는 연어덮밥, 스테이크덮밥 등을 파는 덮밥 집'
        );
      });
  });
});
