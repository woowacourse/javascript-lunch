describe('정렬 셀렉트 박스 테스트', function () {
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

  it('이름순을 선택하면 이름순으로 정렬되어야한다.', function () {
    cy.get('#sort-filter').select('이름순');

    const sortedRestaurants = [...this.restaurantsData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    cy.get('.restaurant-list-container .restaurant').each(($restaurant, index) => {
      cy.wrap($restaurant)
        .find('.restaurant__name')
        .should('have.text', sortedRestaurants[index].name);
    });
  });

  it('거리순을 선택하면 거리순으로 정렬되어야한다.', function () {
    cy.get('#sort-filter').select('거리순');

    const sortedRestaurants = [...this.restaurantsData].sort((a, b) => a.distance - b.distance);

    cy.get('.restaurant-list-container .restaurant').each(($restaurant, index) => {
      cy.wrap($restaurant)
        .find('.restaurant__name')
        .should('have.text', sortedRestaurants[index].name);
      cy.wrap($restaurant)
        .find('.restaurant__distance')
        .should('have.text', `캠퍼스부터 ${sortedRestaurants[index].distance}분 내`);
    });
  });
});
