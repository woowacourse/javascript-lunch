describe('음식점 제출 모달 테스트', () => {
  it('Restaurant Form 제출 시 List에 추가된다.', () => {
    cy.on('uncaught:exception', () => false);
    cy.visit('/');

    cy.get('.restaurant-list')
      .children()
      .its('length')
      .then((RestaurantCountBeforeAdd: number) => {
        cy.get('#add-restaurant-button').click();
        cy.get('#add-category-select').invoke('val', '한식');
        cy.get('#name').type('평가옥');
        cy.get('#add-distance-select').invoke('val', '15');
        cy.get('#description').type('어복쟁반도 맛있지만 만두전골');
        cy.get('#link').type(
          'https://map.naver.com/p/entry/place/12943462?lng=127.0528376&lat=37.5070417&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh',
        );
        cy.get('.button-container').children().eq(1).click();

        cy.get('.restaurant-list')
          .children()
          .its('length')
          .should('eq', RestaurantCountBeforeAdd + 1);
      });
  });
});
