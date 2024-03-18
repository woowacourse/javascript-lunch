describe('자주 가는 식당 테스트', () => {
  it('농민백암식당 본점을 자주 가는 식당으로 등록한다.', () => {
    cy.visit('http://localhost:8080/');

    cy.get('.restaurant-container').each((restaurant) => {
      const fav_restaurant = restaurant.find('.restaurant__name').text();

      if (fav_restaurant === '농민백암순대 본점') {
        restaurant.find('.fav-button').click();
      }
      const localStorageData = window.localStorage.getItem('restaurants');

      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);

        const isFavorite = parsedData.some(
          (restaurantData) => restaurantData.name === '농민백암순대 본점' && restaurantData.isFavorite === true,
        );

        expect(isFavorite).to.be.true;
      }
    });
  });
});
