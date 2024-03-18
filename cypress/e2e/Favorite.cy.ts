describe('자주 가는 음식점 테스트', () => {
  it('자주 가는 음식점과 관련된 e2e 테스트', () => {
    cy.visit('http://localhost:8080/');

    const RESTAURANTS: string[] = ['도스타코스', '잇쇼우', '피양콩할마니'];

    [0, 2, 4].forEach((index: number): void => {
      cy.get('.favorite-icon').eq(index).click();
    });

    cy.contains('자주 가는 음식점').click();

    RESTAURANTS.forEach((restaurant: string): void => {
      cy.contains(restaurant).should('exist');
    });

    cy.contains('피양콩할마니').click();
    cy.get('.restaurant__detail-container').find('.favorite-icon').click();
    cy.contains('닫기').click();

    cy.contains('피양콩할마니').should('not.exist');
  });
});
