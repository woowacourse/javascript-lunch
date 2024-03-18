describe('dropBox 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
  });

  it('선택한 카테고리를 클릭하면 해당하는 카테고리의 음식점 정보만 출력된다.', () => {
    cy.get('#filtering-category').select('chinese');
    cy.get('category-icon').should('have.attr', 'category', 'chinese');
    // 다른 음식점 정보가 존재하지 않아야 한다.
    cy.get('category-icon').should('not.have.attr', 'category', 'korean');

    // 음식점 정보가 존재하지 않을 경우 문구를 출력한다.
    cy.get('#filtering-category').select('asian');
    cy.get('#none-restaurant').should('exist');
  });

  it('선택한 정렬을 클릭하면 해당하는 방식으로 정렬되어 음식점 정보가 출력된다.', () => {
    // 거리순 정렬
    cy.get('#filtering-sorting').select('distance');
    cy.get('.restaurant-list > :nth-child(2) .restaurant__info__title').should(
      'contain',
      '친친',
    );

    // 이름순 정렬
    cy.get('#filtering-sorting').select('name');
    cy.get('.restaurant-list > :nth-child(2) .restaurant__info__title').should(
      'contain',
      '이태리키친',
    );
  });
});
