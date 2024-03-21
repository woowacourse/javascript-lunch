describe('점심 뭐 먹지 동작 테스트', () => {
  it('이 어플리케이션의 제목은 "점심 뭐 먹지"이다.', () => {
    const title = '점심 뭐 먹지';
    cy.visit('http://localhost:8080');

    cy.title().should('eq', title);
  });

  it('"양식점" 이름을 가진 음식점을 추가하면, 음식점 리스트에 "양식점" 이름을 가진 음식점이 추가된다.', () => {
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

  it('"도스타코스 선릉점"의 즐겨찾기가 활성화 되면 자주가는 음식점 목록에 "도스타코스 선릉점"이 추가된다.', () => {
    const restaurant = '도스타코스 선릉점';

    cy.visit('http://localhost:8080');

    cy.get('#restaurant-list > li')
      .contains(restaurant)
      .closest('li')
      .children('.favorite-button')
      .click();

    cy.contains('자주 가는 음식점').click();

    cy.get('#restaurant-list li').should('contains.text', restaurant);
  });
});
