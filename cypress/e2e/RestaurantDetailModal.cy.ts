import { defaultRestaurantData } from '../fixtures/testRestaurantData';

const SELECTORS = require('../constants/selectors');

describe('음식점 상세 정보 모달 테스트', () => {
  beforeEach(() => {
    cy.saveRestaurants(defaultRestaurantData).then(() => {
      cy.visitHome();
      cy.get(SELECTORS.RESTAURANT_DETAIL_MODAL.restaurantInfoContainer).first().click();
    });
  });

  it('음식점 목록 화면에서 음식점 항목을 클릭하면 상세 정보 모달이 나타난다.', () => {
    cy.get(SELECTORS.RESTAURANT_DETAIL_MODAL.modal).should('have.attr', 'open');
  });

  it('상세 정보 모달의 배경 영역, 즉 모달의 바깥 영역을 누르면 모달이 닫힌다.', () => {
    cy.get(SELECTORS.RESTAURANT_DETAIL_MODAL.modal).click({ force: true });
    cy.get(SELECTORS.RESTAURANT_DETAIL_MODAL.modal).should('have.not.attr', 'open');
  });

  it('모달 하단의 "삭제하기" 버튼을 누르면 해당 음식점이 삭제되고 모달이 닫힌다.', () => {
    cy.get(SELECTORS.RESTAURANT_DETAIL_MODAL.restaurantInfoContainer)
      .first()
      .find(SELECTORS.RESTAURANT_DETAIL_MODAL.restaurantName)
      .invoke('text')
      .then((restaurantName) => {
        cy.get(SELECTORS.RESTAURANT_DETAIL_MODAL.deleteButton).click();
        cy.get(SELECTORS.RESTAURANT_DETAIL_MODAL.restaurantList).should('not.contain', restaurantName);
      });
  });

  it('모달 하단의 "닫기" 버튼을 누르면 모달이 닫힌다.', () => {
    cy.get(SELECTORS.RESTAURANT_DETAIL_MODAL.closeButton).click();
    cy.get(SELECTORS.RESTAURANT_DETAIL_MODAL.modal).should('have.not.attr', 'open');
  });
});
