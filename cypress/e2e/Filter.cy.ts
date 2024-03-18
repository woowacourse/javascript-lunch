describe('음식점 필터링 테스트', () => {
  it('음식점 필터링과 관련된 e2e 테스트', () => {
    cy.visit('http://localhost:8080/');
    const ASIAN_RESTAURANTS: string[] = ['피양콩할마니', '호아빈 삼성점'];
    const NON_ASIAN_RESTAURANTS: string[] = ['도스타코스 선릉점', '이태리키친', '잇쇼우', '친친'];

    cy.get('#sorting-filter').select('distance');
    cy.get('.restaurant').eq(1).find('h3').should('have.text', '친친');

    cy.get('#category-filter').select('아시안');
    ASIAN_RESTAURANTS.forEach((asianRestaurant): void => {
      cy.contains(asianRestaurant).should('exist');
    });
    NON_ASIAN_RESTAURANTS.forEach((nonAsianRestaurant): void => {
      cy.contains(nonAsianRestaurant).should('not.exist');
    });
  });
});
