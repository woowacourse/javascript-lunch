describe('App component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('헤더와 메인 섹션을 렌더링한다.', () => {
    cy.get('header.gnb').should('exist');
    cy.get('main').should('exist');
  });

  it('초기 음식점 리스트 렌더링 테스트.', () => {
    cy.get('.restaurant-list-container .tabview__content').should('exist');

    cy.get('.tabview__content').should(($items) => {
      expect($items.find('#restaurant-1')).to.exist;
      expect($items.find('#restaurant-2')).to.exist;
      expect($items.find('#restaurant-3')).to.exist;
    });
  });

  // it('filters restaurants by category and order', () => {
  //   cy.get('.filter-form').within(() => {
  //     cy.get('.filter-category').select('한식');
  //     cy.get('.filter-order').select('거리순');
  //     cy.get('.filter-submit').click();
  //   });
  //
  //   cy.get('.restaurant-list-container .restaurant-item')
  //     .first()
  //     .within(() => {
  //       cy.get('.restaurant__category img').should('have.attr', 'alt', '한식');
  //     });
  // });
  //
  // it('opens and closes the bottom sheet', () => {
  //   cy.get('.restaurant-item .restaurant__name').first().click();
  //   cy.get('.bottom-sheet-container').should('be.visible');
  //   cy.get('.close-bottom-sheet').click();
  //   cy.get('.bottom-sheet-container').should('not.be.visible');
  // });
  //
  // it('deletes a restaurant', () => {
  //   cy.get('.restaurant-item .restaurant__name').first().click();
  //   cy.get('.delete-restaurant').click();
  //   cy.get('.bottom-sheet-container').should('not.be.visible');
  //   cy.get('.restaurant-list-container .restaurant-item').should(
  //     'have.length.greaterThan',
  //     0
  //   );
  // });
  //
  // it('adds a new restaurant', () => {
  //   cy.get('.add-restaurant-button').click();
  //   cy.get('.bottom-sheet-container').should('be.visible');
  //   cy.get('.restaurant-form').within(() => {
  //     cy.get('#name').type('New Restaurant');
  //     cy.get('#category').select('양식');
  //     cy.get('#distance').type('10');
  //     cy.get('#description').type('A new restaurant added by Cypress');
  //     cy.get('#link').type('https://www.example.com');
  //     cy.get('.add-restaurant-submit').click();
  //   });
  //   cy.get('.bottom-sheet-container').should('not.be.visible');
  //   cy.get('.restaurant-list-container .restaurant-item')
  //     .last()
  //     .within(() => {
  //       cy.get('.restaurant__name').should('contain', 'New Restaurant');
  //       cy.get('.restaurant__category img').should('have.attr', 'alt', '양식');
  //     });
  // });
});
