describe('레스토랑 리스트를 필터링해서 조회하는 상황 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport(1920, 1080);

    // 테스트에 필요한 더미 데이터 추가
    cy.get('.gnb__button').click();
    cy.get('#category').select('한식');
    cy.get('#name').type('김치찌개');
    cy.get('#distance').select('15');
    cy.get('#add').click();

    cy.get('.gnb__button').click();
    cy.get('#category').select('중식');
    cy.get('#name').type('쟁반짜장');
    cy.get('#distance').select('5');
    cy.get('#add').click();

    cy.get('.gnb__button').click();
    cy.get('#category').select('일식');
    cy.get('#name').type('스시');
    cy.get('#distance').select('10');
    cy.get('#add').click();
  });

  describe('필터링 카테고리를 선택하면 해당 카테고리의 레스토랑만 출력된다.', () => {
    const categories = ['한식', '중식', '일식'];
    const srcs = ['korean', 'chinese', 'japanese'];

    categories.forEach((category, index) => {
      it(`${category} 카테고리를 선택하면 ${category} 레스토랑만 출력된다.`, () => {
        cy.get('#category-filter').select(category);

        cy.get('.restaurant-list-container').find('li').should('have.length', 1);
        cy.get('.restaurant-list-container')
          .find('li')
          .eq(0)
          .find('.restaurant__category')
          .find('img')
          .should('have.attr', 'src', `./category-${srcs[index]}.png`);
      });
    });
  });

  // it('거리순 정렬을 선택하면 거리에 대해 오름차순으로 정렬한다.', () => {
  //   cy.get('#sorting-filter').select('거리순');
  // });
});
