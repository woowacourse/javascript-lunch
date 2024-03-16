describe('즐겨찾기 버튼 작동 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  const filledStarImg = 'http://localhost:8080/favorite-icon-filled.png';
  const nofilledStarImg = 'http://localhost:8080/favorite-icon-lined.png';

  it('메인 페이지에서 음식점의 즐겨찾기 버튼을 누르면 별의 색이 빨갛게 변한다.', () => {
    cy.get('.favorite-button').first().click();
    cy.get('.favorite-button')
      .first()
      .then(($restaurant) => {
        const $star = $restaurant.find('.star');
        if ($star.length > 0) {
          expect($star.attr('src')).to.equal(filledStarImg);
        }
      });
  });
  it('메인 페이지에서 음식점의 즐겨찾기 버튼을 해제하면 별이 빈별로 변한다.', () => {
    cy.get('.favorite-button').first().click();
    cy.get('.favorite-button').first().click();
    cy.get('.favorite-button')
      .first()
      .then(($restaurant) => {
        const $star = $restaurant.find('.star');
        expect($star.attr('src')).to.equal(nofilledStarImg);
      });
  });
  it('디테일 페이지에서 음식점의 즐겨찾기 버튼을 누르면 디테일 페이지와 메인 페이지의 별이 모두 바뀐다.', () => {
    cy.get('.restaurant').first().click();
    cy.get('.restaurant-detail').find('.star').click();

    cy.get('.restaurant-detail').then(($restaurant) => {
      const $star = $restaurant.find('.star');
      expect($star.attr('src')).to.equal(filledStarImg);
    });

    cy.get('.favorite-button')
      .first()
      .then(($restaurant) => {
        const $star = $restaurant.find('.star');
        expect($star.attr('src')).to.equal(filledStarImg);
      });
  });

  it('자주 가는 음식점에서 즐겨찾기를 해제하면 해당 음식점은 리스트에서 사라진다.', () => {
    cy.get('#favorite-tab').click();

    cy.get('restaurant-item')
      .its('length')
      .then((before) => {
        cy.get('.favorite-button').first().click();
        cy.get('restaurant-item').should('have.length', before - 1);
      });
  });
});
