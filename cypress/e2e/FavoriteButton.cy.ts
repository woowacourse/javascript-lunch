import { defaultRestaurantData } from '../fixtures/testRestaurantData';

const SELECTORS = require('../constants/selectors');

describe('"자주 가는 음식점" 등록 및 해제 테스트', () => {
  beforeEach(() => {
    cy.saveRestaurants(defaultRestaurantData).then(() => cy.visitHome());
  });

  it('음식점 목록 화면에서 "자주 가는 음식점"이 아닌 음식점의 "별표" 버튼을 누르면 버튼색이 변하며 "자주 가는 음식점"으로 등록된다.', () => {
    cy.get(SELECTORS.FAVORITE_BUTTON.restaurantItem)
      .first()
      .find(SELECTORS.FAVORITE_BUTTON.restaurantName)
      .invoke('text')
      .then((restaurantName) => {
        const favoriteButton = cy
          .get(SELECTORS.FAVORITE_BUTTON.restaurantItem)
          .first()
          .find(SELECTORS.FAVORITE_BUTTON.favoriteButton);

        favoriteButton.click();
        favoriteButton.should('have.class', 'favorited');

        cy.selectTab('favorite');
        cy.get(SELECTORS.FAVORITE_BUTTON.restaurantList).should('contain', restaurantName);
      });
  });

  it('음식점 목록 화면에서 "자주 가는 음식점"인 음식점의 "별표" 버튼을 누르면 버튼색이 변하며 "자주 가는 음식점"에서 제외된다.', () => {
    cy.get(SELECTORS.FAVORITE_BUTTON.restaurantItem)
      .last()
      .find(SELECTORS.FAVORITE_BUTTON.restaurantName)
      .invoke('text')
      .then((restaurantName) => {
        const favoriteButton = cy
          .get(SELECTORS.FAVORITE_BUTTON.restaurantItem)
          .last()
          .find(SELECTORS.FAVORITE_BUTTON.favoriteButton);

        favoriteButton.click();
        favoriteButton.should('not.have.class', 'favorited');

        cy.selectTab('favorite');
        cy.get(SELECTORS.FAVORITE_BUTTON.restaurantList).should('not.contain', restaurantName);
      });
  });

  it('자주 가는 음식점 탭에서 음식점의 "별표" 버튼을 누르면 버튼색이 변하며 "자주 가는 음식점"에서 제외된다.', () => {
    cy.selectTab('favorite');

    cy.get(SELECTORS.FAVORITE_BUTTON.restaurantItem)
      .first()
      .find(SELECTORS.FAVORITE_BUTTON.restaurantName)
      .invoke('text')
      .then((restaurantName) => {
        const favoriteButton = cy
          .get(SELECTORS.FAVORITE_BUTTON.restaurantItem)
          .first()
          .find(SELECTORS.FAVORITE_BUTTON.favoriteButton);

        favoriteButton.click();
        favoriteButton.should('not.have.class', 'favorited');

        cy.selectTab('all');
        cy.selectTab('favorite');
        cy.get(SELECTORS.FAVORITE_BUTTON.restaurantList).should('not.contain', restaurantName);
      });
  });

  it('음식점 상세 정보 모달에서 "별표" 버튼을 누르면 모달 화면과 메인 화면에 모두 변경사항이 적용된다.', () => {
    cy.get(SELECTORS.FAVORITE_BUTTON.restaurantInfoContainer).first().click();
    cy.get(SELECTORS.FAVORITE_BUTTON.restaurantDetailContainer).find(SELECTORS.FAVORITE_BUTTON.favoriteButton).click();
    cy.get(SELECTORS.FAVORITE_BUTTON.restaurantDetailContainer)
      .find(SELECTORS.FAVORITE_BUTTON.favoriteButton)
      .should('have.class', 'favorited');
    cy.get(SELECTORS.FAVORITE_BUTTON.restaurantItem)
      .first()
      .find(SELECTORS.FAVORITE_BUTTON.favoriteButton)
      .should('have.class', 'favorited');
  });
});
