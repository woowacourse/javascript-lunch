describe('음식점 상세 정보 모달창 테스트', () => {
  beforeEach(() => {
    cy.lunchWebVisit();
    cy.get('.restaurant').first().click();
  });

  it('음식점 목록을 클릭하면 해당 음식점의 상세정보 모달창이 떠야한다.', () => {
    cy.get('.modal-detail').should('have.class', 'modal--open');
  });

  it('클릭한 음식점 목록의 음식점 정보와 상세정보 모달창의 음식점 정보가 일치해야한다.', () => {
    cy.get('.restaurant')
      .first()
      .then(($restaurant) => {
        const name = $restaurant.find('.restaurant__name').text();
        const distance = $restaurant.find('.restaurant__distance').text();
        const description = $restaurant.find('.restaurant__description').text();

        cy.get('.modal-detail h3').should('have.text', name);
        cy.get('.modal-detail .restaurant__distance').should('have.text', distance);
        cy.get('.modal-detail p').should('have.text', description);
      });
  });

  it('즐겨찾기 아이콘을 누르면 localStorage의 해당 음식점의 isFavorite 속성값이 원래 값과 반대로 업데이트된다.', () => {
    cy.get('.restaurant')
      .first()
      .then(($restaurant) => {
        const name = $restaurant.find('.restaurant__name').text();

        cy.window().then((window) => {
          const restaurants = JSON.parse(window.localStorage.getItem('restaurant') || '[]');
          const restaurant = restaurants.find((r) => r.name === name);
          const initialIsFavorite = restaurant.isFavorite;

          cy.get('.modal-detail .favorite-button').click({ force: true });

          cy.window().then((window) => {
            const updatedRestaurants = JSON.parse(
              window.localStorage.getItem('restaurant') || '[]'
            );
            const updatedRestaurant = updatedRestaurants.find((r) => r.name === name);
            expect(updatedRestaurant.isFavorite).to.equal(!initialIsFavorite);
          });
        });
      });
  });

  it('삭제하기 버튼을 누르면 해당 음식점의 정보가 localStorage에서 삭제되고 모달창이 닫힌다.', () => {
    cy.get('.restaurant')
      .first()
      .then(($restaurant) => {
        const name = $restaurant.find('.restaurant__name').text();

        cy.get('#restaurant-detail-modal_delete-button').click();
        cy.get('.modal-detail').should('not.exist');

        cy.window().then((window) => {
          const restaurants = JSON.parse(window.localStorage.getItem('restaurant') || '[]');
          expect(restaurants.find((restaurant) => restaurant.name === name)).to.be.undefined;
        });
      });
  });

  it('닫기 버튼을 누르면 모달창이 닫힌다.', () => {
    cy.get('#restaurant-detail-modal_close-button').click();
    cy.get('.modal-detail').should('not.exist');
  });
});
