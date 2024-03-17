import { defaultRestaurantData } from '../fixtures/testRestaurantData';

describe('"자주 가는 음식점" 등록 및 해제 테스트', () => {
  beforeEach(() => {
    cy.saveRestaurants(defaultRestaurantData).then(() => cy.visitHome());
  });

  it('음식점 목록 화면에서 "자주 가는 음식점"이 아닌 음식점의 "별표" 버튼을 누르면 버튼색이 변하며 "자주 가는 음식점"으로 등록된다.', () => {
    cy.get('.restaurant')
      .first()
      .find('h3.restaurant__name')
      .invoke('text')
      .then((restaurantName) => {
        const favoriteButton = cy.get('.restaurant').first().find('button.restaurant__favorite-button');

        favoriteButton.click();
        favoriteButton.should('have.class', 'favorited');

        cy.selectTab('favorite');
        cy.get('restaurant-list').should('contain', restaurantName);
      });
  });

  it('음식점 목록 화면에서 "자주 가는 음식점"인 음식점의 "별표" 버튼을 누르면 버튼색이 변하며 "자주 가는 음식점"에서 제외된다.', () => {
    cy.get('.restaurant')
      .last()
      .find('h3.restaurant__name')
      .invoke('text')
      .then((restaurantName) => {
        const favoriteButton = cy.get('.restaurant').last().find('button.restaurant__favorite-button');

        favoriteButton.click();
        favoriteButton.should('not.have.class', 'favorited');

        cy.selectTab('favorite');
        cy.get('restaurant-list').should('not.contain', restaurantName);
      });
  });

  it('자주 가는 음식점 탭에서 음식점의 "별표" 버튼을 누르면 버튼색이 변하며 "자주 가는 음식점"에서 제외된다.', () => {
    cy.selectTab('favorite');

    cy.get('.restaurant')
      .first()
      .find('h3.restaurant__name')
      .invoke('text')
      .then((restaurantName) => {
        const favoriteButton = cy.get('.restaurant').first().find('button.restaurant__favorite-button');

        favoriteButton.click();
        favoriteButton.should('not.have.class', 'favorited');

        cy.selectTab('all');
        cy.selectTab('favorite');
        cy.get('restaurant-list').should('not.contain', restaurantName);
      });
  });

  it('음식점 상세 정보 모달에서 "별표" 버튼을 누르면 모달 화면과 메인 화면에 모두 변경사항이 적용된다.', () => {
    cy.get('.restaurant__info').first().click();
    cy.get('.restaurant__detail').find('button.restaurant__favorite-button').click();
    cy.get('.restaurant__detail').find('button.restaurant__favorite-button').should('have.class', 'favorited');
    cy.get('.restaurant').first().find('button.restaurant__favorite-button').should('have.class', 'favorited');
  });
});
