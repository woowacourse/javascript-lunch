import { STORAGE_KEY } from './../../src/constants/storageKey';

describe('모두 가는 음식점, 자주 가는 음식점 네비게이션 바 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('자주 가는 음식점 목록 버튼을 클릭하면, 모든 음식점이 아닌 즐겨찾기를 한 음식점 리스트가 화면에 나타난다.', () => {
    // 초기 : 자주 가는 음식점 목록 없음, 모든 음식점 목록 있음
    cy.get('.favorite-restaurant-list').should('not.exist');
    cy.get('.all-restaurant-list').should('exist');

    //자주 가는 음식점 목록 버튼 클릭
    cy.get('navigation-bar').find('button').eq(1).click();

    //자주 가는 음식점 목록 확인 (모든 음식점 목록 겂음)
    cy.get('.favorite-restaurant-list').should('exist');
    cy.get('.all-restaurant-list').should('not.exist');

    // 리스트의 모든 음식점의 즐겨찾기 여부는 true
    cy.get('favorite-icon').find('.favorite-true-img').should('be.visible');
  });

  it('모든 음식점 목록 버튼을 클릭하면, 모든 음식점 리스트가 화면에 나타난다.', () => {
    //자주 가는 음식점 목록 버튼 클릭
    cy.get('navigation-bar').find('button').eq(0).click();

    //자주 가는 음식점 목록 확인 (모든 음식점 목록 겂음)
    cy.get('.all-restaurant-list').should('exist');
    cy.get('.favorite-restaurant-list').should('not.exist');

    //모든 음식점이 화면에 나타났는지 확인
    cy.window().then((win) => {
      const data = win.localStorage.getItem(STORAGE_KEY.restaurants);

      if (data) {
        const numberOfRestaurant = JSON.parse(data).length;
        cy.get('restaurant-item')
          .its('length')
          .should('eq', numberOfRestaurant);
      }
    });
  });
});
