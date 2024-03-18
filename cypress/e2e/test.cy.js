describe('자주 가는 식당 테스트', () => {
  it('농민백암식당 본점을 자주 가는 식당으로 등록한다.', () => {
    cy.visit('http://localhost:8080/');
    let isFavorite = false;

    cy.get('.restaurant-container').each((restaurant) => {
      const favRestaurant = restaurant.find('.restaurant__name').text();

      if (favRestaurant === '영빈관') {
        restaurant.find('.fav-button').click();
      }

      const localStorageData = window.localStorage.getItem('restaurants');
      console.log(localStorageData);
      const parsedData = JSON.parse(localStorageData);

      parsedData.forEach((restaurantData) => {
        if (restaurantData.name === '영빈관') {
          isFavorite = restaurantData.isFavorite;
          console.log(restaurantData.isFavorite);
        }
      });
      console.log(isFavorite);
      cy.wait(3000);
    });

    expect(isFavorite).to.equal(true);
  });

  // it('농민백암식당 본점을 자주 가는 식당으로 등록한다.', () => {
  //   cy.visit('http://localhost:8080/');

  //   cy.get('.restaurant-container').each((restaurant) => {
  //     // console.log('real?', restaurant);
  //     const fav_restaurant = restaurant.find('.restaurant__name').text();

  //     if (fav_restaurant === '도스타코스 선릉점') {
  //       restaurant.find('.fav-button').click();
  //     }

  //     const localStorageData = window.localStorage.getItem('restaurants');

  //     // console.log(localStorageData);

  //     if (localStorageData) {
  //       const parsedData = JSON.parse(localStorageData);

  //       const isFavorite = parsedData.some(
  //         (restaurantData) => restaurantData.name === '도스타코스 선릉점' && restaurantData.isFavorite === false,
  //       );

  //       expect(isFavorite).to.be.true;
  //     }
  //   });
  // });

  // it('도스타코스 선릉점을 자주 가는 식당에서 제외한다', () => {
  //   cy.visit('http://localhost:8080/');

  //   cy.get('.restaurant-container').each((restaurant) => {
  //     console.log(restaurant);
  //     const fav_restaurant = restaurant.find('.restaurant__name').text();
  //     console.log('dd', fav_restaurant);

  //     if (fav_restaurant === '도스타코스 선릉점') {
  //       restaurant.find('.fav-button').click();
  //     }
  //     const localStorageData = window.localStorage.getItem('restaurants');

  //     if (localStorageData) {
  //       const parsedData = JSON.parse(localStorageData);
  //       // console.log(parsedData);

  //       const isFavorite = parsedData.some(
  //         (restaurantData) => restaurantData.name === '도스타코스 선릉점' && restaurantData.isFavorite === false,
  //       );

  //       expect(isFavorite).to.be.true;
  //     }
  //   });
  // });
});
