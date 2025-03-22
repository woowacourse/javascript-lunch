describe('음식점 조회 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.viewport(1280, 1000);
  });

  it('모든 음식점 탭을 클릭하면 로컬 스토리지에 있는 배열의 길이와 동일한 데이터를 가져온다.', () => {
    cy.get('.tab-item#all').click();
    cy.get('.tab-item#all').should('have.class', 'tab-item-selected');
    cy.get('.restaurant-filter-container').should('be.visible');

    cy.window().then((win) => {
      const restaurantData = JSON.parse(win.localStorage.getItem('restaurant') || '[]');
      expect(restaurantData).to.not.be.null;

      const len = restaurantData.length;

      cy.get('.restaurant-list li').should('have.length', len);
    });
  });

  it('자주 가는 음식점 탭을 클릭하면 모든 음식점의 별이 눌린 음식점을 보여준다.', () => {
    cy.get('.tab-item#favorite').click();
    cy.get('.tab-item#favorite').should('have.class', 'tab-item-selected');
    cy.get('.restaurant-filter-container').should('not.be.visible');

    cy.get('.restaurant-list li').each((ele) => {
      cy.wrap(ele).find('.restaurant__star').should('have.class', 'restaurant__star--clicked');
    });
  });

  it('카테고리를 선택하면 카테고리와 동일한 음식점 목록을 보여준다.', () => {
    const category = '한식';

    cy.get('.tab-item#all').click();
    cy.get('select#category-filter').select(category);

    cy.get('.restaurant-list li').each((ele) => {
      cy.wrap(ele).find('.category-icon').should('have.attr', 'alt', 'korean');
    });
  });
});
