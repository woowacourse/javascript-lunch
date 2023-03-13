describe('App component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('헤더와 메인 섹션을 렌더링 해야한다..', () => {
    cy.get('header.gnb').should('exist');
    cy.get('main').should('exist');
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

  it('필터바에 따라 해당 카테고리의 음식점만 보여야 한다.', () => {
    cy.get('#category-filter').select('일식');
    cy.get('#sorting-filter').select('name');

    cy.get('.tabview__content [id^="restaurant-"]')
      .should('have.length', 2)
      .each(($el) => {
        cy.wrap($el)
          .find('.restaurant__category img')
          .should('have.attr', 'alt', '일식');
      });
  });

  it('favorite 아이콘을 클릭하면 해당 음식점을 자주 가는 음식점 탭에 보여준다', () => {
    cy.get('.tabview__content [id^="restaurant-"]').should('have.length', 3);

    cy.get('#restaurant-2 .restaurant__favorite__icon').click();

    cy.get('.tabview__nav__button[data-tab="favorites"]').click();

    cy.get('.tabview__content [id^="restaurant-"]').should('have.length', 1);

    cy.get('#restaurant-1 .restaurant__favorite__icon')
      .should('have.attr', 'src')
      .should('include', 'favorite-icon-filled.png');
  });

  it('음식점 삭제 테스트', () => {
    cy.get('.tabview__content [id^="restaurant-"]').last().click();
    cy.get('.delete-restaurant').click();

    cy.get('.tabview__content [id^="restaurant-"]').should('have.length', 2);
  });
});
