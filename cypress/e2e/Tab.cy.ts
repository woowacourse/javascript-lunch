import { RESTAURANTS_DB_KEY } from '@/constants/Condition';

describe('탭 작동 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('처음 홈페이지를 열면 탭이 렌더링되고, 두 탭 중에 모든 음식점만이 선택된 상태로 나온다.', () => {
    cy.get('.tab-menu').should('exist');
    cy.get('.tab-menu').then(($tabMenu) => {
      $tabMenu.find('#all-tab');
      $tabMenu.find('#favorite-tab');
    });

    cy.get('#all-tab').should('have.class', 'active');
    cy.get('#favorite-tab').should('have.not.class', 'active');
  });

  it('자주 가는 음식점을 클릭하면 favorite 요소가 true인 음식점들만 나온다.', () => {
    cy.get('#favorite-tab').click();

    cy.get('.restaurant').then(($restaurant) => {
      const $star = $restaurant.find('.star');
      if ($star.length > 0) {
        const filledStarImg = 'http://localhost:8080/favorite-icon-filled.png';
        expect($star.attr('src')).to.equal(filledStarImg);
      }
    });
  });

  it('모든 음식점 탭을 클릭하면 로컬 스토리지의 모든 음식점을 나온다.', () => {
    cy.get('#favorite-tab').click();
    cy.get('#all-tab').click();

    cy.get('.restaurant').should(
      'have.length',
      JSON.parse(localStorage.getItem(RESTAURANTS_DB_KEY) || '[]').length,
    );
  });
});
