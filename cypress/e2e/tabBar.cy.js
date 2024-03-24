describe('탭바 테스트', function () {
  beforeEach(() => {
    cy.fixture('restaurants.json')
      .as('restaurantsData')
      .then((restaurants) => {
        cy.window().then((win) => {
          win.localStorage.setItem('restaurant', JSON.stringify(restaurants));
        });
      });
    cy.lunchWebVisit();
  });

  it('"모든 음식점" 탭바 버튼을 누르면 모든 음식점들이 나와야한다.', function () {
    cy.get('#all-restaurants-button').click();

    cy.get('.restaurant-list-container .restaurant').should(
      'have.length',
      this.restaurantsData.length
    );

    cy.get('.restaurant-list-container .restaurant').each(($restaurant) => {
      const restaurantName = $restaurant.find('.restaurant__name').text();
      const restaurantDistance = $restaurant.find('.restaurant__distance').text();

      const restaurantData = this.restaurantsData.find(
        (restaurant) => restaurant.name === restaurantName
      );
      expect(restaurantData).to.exist;
      expect(restaurantDistance).to.equal(`캠퍼스부터 ${restaurantData.distance}분 내`);
    });
  });

  it('"자주 가는 음식점" 탭바 버튼을 누르면 즐겨찾기한 음식점들만 나와야한다.', function () {
    cy.get('#favorite-restaurants-button').click();

    const favoriteRestaurants = this.restaurantsData.filter((restaurant) => restaurant.isFavorite);

    cy.get('.restaurant-list-container .restaurant').should(
      'have.length',
      favoriteRestaurants.length
    );

    cy.get('.restaurant-list-container .restaurant').each(($restaurant) => {
      const restaurantName = $restaurant.find('.restaurant__name').text();
      const restaurantDistance = $restaurant.find('.restaurant__distance').text();

      const restaurantData = favoriteRestaurants.find(
        (restaurant) => restaurant.name === restaurantName
      );
      expect(restaurantData).to.exist;
      expect(restaurantDistance).to.equal(`캠퍼스부터 ${restaurantData.distance}분 내`);
      cy.wrap($restaurant)
        .find('.favorite-icon')
        .should('have.attr', 'src')
        .and('include', 'favorite-icon-filled');
    });
  });
});
