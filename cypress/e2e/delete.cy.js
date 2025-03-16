import { VISIT_URL_CONSTANT } from './constants/visitUrl.js';

describe('요소를 삭제할 수 있다.', () => {
  beforeEach(() => {
    cy.visit(VISIT_URL_CONSTANT.LINK);
  });

  it('모달창을 열어서 삭제하기 버튼을 누르면, 음식점 리스트에서 없어야 한다.', () => {
    cy.get('.restaurant-list-container .restaurant').first().as('firstRestaurant');

    cy.get('@firstRestaurant')
      .find('.restaurant__info .restaurant__name')
      .invoke('text')
      .then((restaurantName) => {
        cy.get('@firstRestaurant').click();
        cy.contains('삭제하기').click();

        cy.get('.restaurant-list-container .restaurant__info .restaurant__name').should(
          'not.contain',
          restaurantName.trim(),
        );
      });
  });
});
