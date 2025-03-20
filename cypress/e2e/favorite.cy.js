describe('자주 가는 음식점 추가 및 확인', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('음식점 목록에서 자주 가는 음식점을 추가할 수 있다', () => {
    cy.get('.restaurant .favorite-icon').first().click();
    cy.get('.restaurant .favorite-icon').first().should('have.attr', 'src', 'images/favorite-icon-filled.png');
  });

  it('음식점 상세 정보에서 자주 가는 음식점으로 추가할 수 있다', () => {
    cy.get('.restaurant').first().click();
    cy.get('.modal .favorite-icon').click();
    cy.get('.modal .favorite-icon').should('have.attr', 'src', 'images/favorite-icon-filled.png');
  });

  it('자주 가는 음식점 탭에서 추가한 음식점이 정상적으로 반영된다', () => {
    cy.get('.restaurant .restaurant__name')
      .first()
      .invoke('text')
      .then((restaurantName) => {
        cy.get('.restaurant .favorite-icon').first().click();

        cy.get('.favorite-restaurant-tab').click();
        cy.wait(500);

        cy.get('.restaurant .restaurant__name').should('contain', restaurantName);
      });
  });
});
