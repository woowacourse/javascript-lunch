const { CATEGORY } = require('../../src/constants');
describe('카테고리 셀렉트 박스 테스트', function () {
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

  const categories = ['전체', '한식', '중식', '일식', '양식', '아시안', '기타'];

  categories.forEach((category) => {
    it(`${category}을(를) 선택하면 ${
      category === '전체' ? '모든' : category
    } 음식점만 보여준다.`, function () {
      cy.get('#category-filter').select(category);

      if (category === '전체') {
        cy.get('.restaurant-list-container .restaurant').should(
          'have.length',
          this.restaurantsData.length
        );
      } else {
        const filteredRestaurants = this.restaurantsData.filter(
          (restaurant) => restaurant.category === category
        );

        cy.get('.restaurant-list-container .restaurant').should(
          'have.length',
          filteredRestaurants.length
        );

        cy.get('.restaurant-list-container .restaurant').each(($restaurant) => {
          const restaurantName = $restaurant.find('.restaurant__name').text();
          const restaurantCategory = $restaurant.find('.restaurant__category img').attr('src');

          expect(filteredRestaurants.map((restaurant) => restaurant.name)).to.include(
            restaurantName
          );
          expect(restaurantCategory).to.include(
            `category-${Object.keys(CATEGORY).find((key) => CATEGORY[key] === category)}`
          );
        });
      }
    });
  });
});
