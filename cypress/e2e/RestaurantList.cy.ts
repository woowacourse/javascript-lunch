import { defaultRestaurantData } from '../fixtures/testRestaurantData';

const SELECTORS = require('../constants/selectors');

describe('홈페이지 및 음식점 목록 화면 테스트', () => {
  beforeEach(() => {
    cy.saveRestaurants(defaultRestaurantData).then(() => cy.visitHome());
  });

  it('홈페이지 화면에 현재까지 저장된 음식점 목록이 노출되어야 한다.', () => {
    cy.get(SELECTORS.RESTAURANT_LIST.restaurantItem).should('have.length', defaultRestaurantData.length);
  });

  it('홈페이지 화면에 처음 접속했을 경우 "모든 음식점" 탭이 선택되어 있어야 한다.', () => {
    cy.get(SELECTORS.RESTAURANT_LIST.restaurantListTab).should('exist');
    cy.get(SELECTORS.RESTAURANT_LIST.tabAllButton).should('have.class', 'active');
    cy.get(SELECTORS.RESTAURANT_LIST.tabFavoriteButton).should('have.not.class', 'active');
  });

  it('"자주 가는 음식점" 탭을 누르면 자주 가는 음식점으로 등록된 항목이 노출되어야 한다.', () => {
    cy.selectTab('favorite');
    cy.get(SELECTORS.RESTAURANT_LIST.restaurantItem).should('have.length', 2);
    cy.get(SELECTORS.RESTAURANT_LIST.favoritedButton).should('have.length', 2);
  });
});
