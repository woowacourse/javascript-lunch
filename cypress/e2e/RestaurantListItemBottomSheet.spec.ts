import mockRestaurants from './mocks/mockRestaurants';

describe('음식점 바텀시트 모달에 관한 테스트', () => {
  it('메인 페이지에 있는 음식점 li태그를 클릭하면 바텀시트 모달이 띄워진다', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('restaurantList', JSON.stringify(mockRestaurants));
    });

    cy.visitMainPage();

    cy.get('li.restaurant').first().click();

    cy.get('.detail-container').should('be.visible');
  });
});
