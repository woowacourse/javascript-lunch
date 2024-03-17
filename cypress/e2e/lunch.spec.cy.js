describe('점심 뭐 먹지 동작 테스트', () => {
  it('이 어플리케이션의 제목은 "점심 뭐 먹지"이다.', () => {
    const title = '점심 뭐 먹지';
    cy.visit('http://localhost:8080');

    cy.title().should('eq', title);
  });

  it('"양식점" 이름을 가진 음식점을 추가할 수 있다.', () => {
    const restaurantName = '양식점';

    cy.visit('http://localhost:8080');

    cy.get('#gnb__button').click();
    cy.get('#category').select('양식');
    cy.get('#name').type(restaurantName);
    cy.get('#distance').select('5분 내');

    cy.contains('추가하기').click();

    cy.get('#restaurant-list').children().first().should('contain.text', restaurantName);
  });

  it('"피양콩할마니" 이름을 가진 음식점을 삭제할 수 있다.', () => {
    const restaurantName = '피양콩할마니';

    cy.visit('http://localhost:8080');

    cy.contains(restaurantName).click();
    cy.contains('삭제하기').click();

    cy.get('#restaurant-list').children().should('not.contain.text', restaurantName);
  });

  it('자주 가는 음식점 목록의 음식점은 모두 즐겨찾기가 추가되어 있다.', () => {
    const favorite = '즐겨찾기추가';

    cy.visit('http://localhost:8080');

    cy.contains('자주 가는 음식점').click();

    cy.get('#restaurant-list li').each(($element) => {
      cy.get($element).find('.favorite-button img').should('have.attr', 'alt', favorite);
    });
  });
});
