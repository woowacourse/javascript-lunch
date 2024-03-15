import mockRestaurants from './mocks/mockRestaurants';

describe('음식점 바텀시트 모달에 관한 테스트', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('restaurantList', JSON.stringify(mockRestaurants));
    });
  });
  it('메인 페이지에 있는 음식점 li태그를 클릭하면 바텀시트 모달이 띄워진다', () => {
    cy.visitMainPage();

    cy.get('li.restaurant').first().click();

    cy.get('.detail-container').should('be.visible');
  });

  it('바텀시트의 즐겨찾기 버튼을 클릭하면, 메인 페이지의 좋아요 태그도 변화한다.', () => {
    cy.visitMainPage();

    cy.get('li.restaurant').first().click();

    cy.get('.detail-container').should('be.visible');

    cy.get('.favorited-icon').first().click();

    cy.visitMainPage();
    cy.get('li.restaurant').first().click();

    cy.get('li.restaurant')
      .first()
      .find('img.favorited-icon')
      .should('have.attr', 'src', 'http://localhost:8080/favorite-icon-filled.png');
  });
});
