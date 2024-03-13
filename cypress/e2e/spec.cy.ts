import restaurants from '../fixtures/restaurants.json';
import addRestaurantData from '../fixtures/addRestaurantData.json';

describe('점심 뭐 먹지 로컬 스토리지에 데이터가 없는 경우를 테스트한다', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.viewport(550, 950);
    localStorage.removeItem('restaurants');
  });

  it('데이터가 없을 경우 목록 부분이 비어있어야 한다.', () => {
    cy.get('.restaurant-item').should('not.exist');
  });
});

describe('점심 뭐 먹지 로컬 스토리지에 데이터가 있는 경우를 테스트한다', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.viewport(550, 950);
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  });

  it('새로운 음식점을 추가할 수 있다.', () => {
    cy.get('.gnb__button').click();
    cy.get('.modalCategory').select(addRestaurantData.category);
    cy.get('.modal-restaurant-name').type(addRestaurantData.name);
    cy.get('.modalDistance').select(addRestaurantData.distance);
    cy.get('.modal-description').type(addRestaurantData.description);
    cy.get('.modal-reference').type(addRestaurantData.reference);
    cy.get('.button--primary').click();
    cy.get('.restaurant').last().find('.restaurant__name').should('contain', addRestaurantData.name);
    cy.get('.restaurant').last().find('.restaurant__distance').should('contain', addRestaurantData.distance);
    cy.get('.restaurant').last().find('.restaurant__description').should('contain', addRestaurantData.description);
  });

  context('음식점을 카테고리 별로 필터링할 수 있다.', () => {
    restaurants.forEach((restaurant) => {
      it(`${restaurant.category}을 선택한 경우 카테고리가 ${restaurant.category}인 음식점만 표시된다.`, () => {
        cy.get('.category').select(restaurant.category);
        cy.get('.restaurant').find('.restaurant__name').should('contain', restaurant.name);
      });
    });
  });

  context('음식점을 이름순, 거리순으로 정렬할 수 있다.', () => {
    it('이름순을 선택한 경우 이름순으로 음식점이 정렬된다.', () => {
      const sortedByName = restaurants.sort((a, b) => a.name.localeCompare(b.name));
      cy.get('.sorting').select('이름순');
      cy.get('.restaurant').first().find('.restaurant__name').should('contain', sortedByName[0].name);
      cy.get('.restaurant')
        .last()
        .find('.restaurant__name')
        .should('contain', sortedByName[sortedByName.length - 1].name);
    });

    it('거리순을 선택한 경우 거리순으로 음식점이 정렬된다.', () => {
      const sortedByDistance = restaurants.sort((a, b) => a.distance - b.distance);
      cy.get('.sorting').select('거리순');
      cy.get('.restaurant').first().find('.restaurant__name').should('contain', sortedByDistance[0].name);
      cy.get('.restaurant')
        .last()
        .find('.restaurant__name')
        .should('contain', sortedByDistance[sortedByDistance.length - 1].name);
    });
  });
});
