describe('자주 가는 식당 테스트', () => {
  it('농민백암순대 본점을 자주 가는 식당에 추가한다.', () => {
    cy.visit('http://localhost:8080/');

    cy.get('.restaurant-container').each((restaurant) => {
      const favRestaurant = restaurant.find('.restaurant__name').text();

      if (favRestaurant === '농민백암순대 본점') {
        restaurant.find('.fav-button').click();
      }
    });

    cy.getAllLocalStorage().then((result) => {
      const localStorageData = JSON.parse(result['http://localhost:8080'].restaurants);
      localStorageData.forEach((restaurant) => {
        if (restaurant.name === '농민백암순대 본점') {
          expect(restaurant.isFavorite).to.be.true;
        }
      });
    });
  });

  it('도스타코스 선릉점을 자주 가는 식당에서 제외한다.', () => {
    cy.visit('http://localhost:8080/');

    cy.get('.restaurant-container').each((restaurant) => {
      const favRestaurant = restaurant.find('.restaurant__name').text();

      if (favRestaurant === '도스타코스 선릉점') {
        restaurant.find('.fav-button').click();
      }
    });

    cy.getAllLocalStorage().then((result) => {
      const localStorageData = JSON.parse(result['http://localhost:8080'].restaurants);
      localStorageData.forEach((restaurant) => {
        if (restaurant.name === '도스타코스 선릉점') {
          expect(restaurant.isFavorite).to.be.not.true;
        }
      });
    });
  });
});
