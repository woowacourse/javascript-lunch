describe('App component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('헤더와 메인 섹션을 렌더링 해야한다..', () => {
    cy.get('header.gnb').should('exist');
    cy.get('main').should('exist');
  });

  it('초기 음식점 리스트(더미 데이터) 3개를 렌더링 해야한다.', () => {
    cy.get('.restaurant-list-container .tabview__content').should('exist');

    cy.get('.tabview__content').should(($items) => {
      expect($items.find('#restaurant-1')).to.exist;
      expect($items.find('#restaurant-2')).to.exist;
      expect($items.find('#restaurant-3')).to.exist;
    });
  });

  it('음식점 등록 후 리스트에 해당 음식점이 존재해야한다.', () => {
    cy.get('.nav-add-button').click();
    cy.get('.modal-container').should('be.visible');
    cy.get('.restaurant-form').within(() => {
      cy.get('#name').type('르산테');
      cy.get('#category').select('양식');
      cy.get('#distance').select('10');
      cy.get('#description').type('최고 양식집');
      cy.get('#link').type('https://www.example.com');
      cy.get('.submit-restaurant').click();
    });
    cy.get('.restaurant-list-container .restaurant')
      .last()
      .within(() => {
        cy.get('.restaurant__name').should('contain', '르산테');
        cy.get('.restaurant__category img').should('have.attr', 'alt', '양식');
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
});
