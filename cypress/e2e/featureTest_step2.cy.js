describe('step2 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.viewport(1024, 768);
  });

  describe('카테고리 필터링 테스트', () => {
    it('기본 상태에서 모든 음식점이 보이는지 확인한다.', () => {
      cy.get('.restaurant-list .restaurant')
        .should('have.length', 6);
    });

    const categories = ['한식', '중식', '일식', '양식', '아시안', '기타'];
    describe('사용자가 각 필터를 선택하면 각 카테고리 음식점만 보인다.', () => {
      categories.forEach((category) => {
        it(`사용자가 '${category}' 필터를 선택하면 ${category} 카테고리 음식점만 보인다.`, () => {
          cy.get('#category-filter').select(category);

          cy.get('.restaurant-list .restaurant').each(($restaurant) => {
            cy.wrap($restaurant)
              .find('.restaurant__category img')
              .should('have.attr', 'alt', category);
          });
        });
      });
    });

    it('사용자가 한식 -> 중식 필터를 선택하면 중식 카테고리 음식점만 보인다.', () => {
      cy.get('#category-filter').select('한식');
      cy.get('#category-filter').select('중식');

      cy.get('.restaurant-list .restaurant').each(($restaurant) => {
        cy.wrap($restaurant)
          .find('.restaurant__category img')
          .should('have.attr', 'alt', '중식');
      });
    })

    it('사용자가 한식 → 전체 필터를 선택하면 모든 음식점이 보인다.', () => {
      cy.get('#category-filter').select('한식');
      cy.get('#category-filter').select('전체');

      cy.get('.restaurant-list .restaurant')
        .should('have.length', 6);
    })

    it('필터를 선택했을 때 존재하는 음식점이 없으면 빈 화면이 보인다.', () => {
      cy.get('.restaurant[data-id="1"]').click();
      cy.get('.modal--open').should('exist');
      cy.get('.delete-button').click();
      cy.get('.modal--open').should('not.exist');

      cy.get('#category-filter').select('한식');

      cy.get('.restaurant-list .restaurant')
        .should('have.length', 0);
    })

    it('필터를 선택했을 때 존재하는 음식점이 없으면 빈 화면이 보인다.', () => {
      cy.get('.restaurant[data-id="1"]').click();
      cy.get('.modal--open').should('exist');
      cy.get('.delete-button').click();
      cy.get('.modal--open').should('not.exist');

      cy.get('#category-filter').select('한식');

      cy.get('.restaurant-list .restaurant')
        .should('have.length', 0);
    })
  });
});
