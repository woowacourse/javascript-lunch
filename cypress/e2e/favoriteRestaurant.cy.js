describe('자주 가는 식당 테스트', () => {
  it('농민백암순대 본점을 자주 가는 식당에 추가한다.', () => {
    cy.customVisit();

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
    cy.customVisit();

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

  it('자주 가는 식당인 잇쇼우, 도스타코스 선릉점에 농민백암순대 본점을 추가한 후 자주 가는 음식점 목록에 앞선 세 음식점이 있다.', () => {
    cy.customVisit();

    cy.get('.restaurant-container').each((restaurant) => {
      const favRestaurant = restaurant.find('.restaurant__name').text();

      if (favRestaurant === '농민백암순대 본점') {
        restaurant.find('.fav-button').click();
      }
    });

    cy.contains('자주 가는 음식점').click();

    cy.contains('농민백암순대 본점').should('be.visible');
    cy.contains('잇쇼우').should('be.visible'); // mocking
    cy.contains('도스타코스 선릉점').should('be.visible'); // mocking
  });
});
