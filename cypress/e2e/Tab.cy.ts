describe('탭 작동 테스트', () => {
  const NEW_RESTAURANT1 = {
    name: '아웃백',
    category: '양식',
    distance: '20',
    description: '호주 컨셉의 미국의 외식업체이다.',
    link: 'https://www.naver.com',
  };

  const NEW_RESTAURANT2 = {
    name: '친친',
    category: '중식',
    distance: '5',
    description: `Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중식의 세계를
      펼쳐갑니다.`,
    link: 'https://www.naver.com',
  };

  const NEW_RESTAURANT3 = {
    name: '구구당',
    category: '아시안',
    distance: '15',
    description: `홍콩식 음식이 맛있음!`,
    link: 'https://www.naver.com',
  };

  const restaurants = [NEW_RESTAURANT1, NEW_RESTAURANT2, NEW_RESTAURANT3];
  const sortedAllRestaurants = [NEW_RESTAURANT3, NEW_RESTAURANT1, NEW_RESTAURANT2].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  beforeEach(() => {
    cy.visit('http://localhost:8080/');

    const $addModalButton = cy.get('.gnb__button');
    const $addModal = cy.get('#add-modal');

    restaurants.forEach((restaurant) => {
      $addModalButton.click();

      $addModal.get('#category').select(restaurant.category);
      $addModal.get('#name').type(restaurant.name);
      $addModal.get('#distance').select(restaurant.distance);
      $addModal.get('#link').type(restaurant.link);

      const $addButton = $addModal.get('button').contains('추가하기');
      $addButton.click();
    });
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
    cy.get('.favorite-button').first().click();
    cy.get('.favorite-button').last().click();

    cy.get('#favorite-tab').click();

    cy.get('restaurant-item').then(($restaurant) => {
      const $star = $restaurant.find('.star');
      if ($star.length > 0) {
        const filledStarImg = 'http://localhost:8080/favorite-icon-filled.png';
        expect($star.attr('src')).to.equal(filledStarImg);
      }
    });

    cy.get('restaurant-item').should('have.length', 2);
    cy.get('restaurant-item').should('contain.text', sortedAllRestaurants[0].name);
    cy.get('restaurant-item').should('contain.not.text', sortedAllRestaurants[1].name);
    cy.get('restaurant-item').should('contain.text', sortedAllRestaurants[2].name);
  });

  it('모든 음식점 탭을 클릭하면 로컬 스토리지의 모든 음식점을 나온다.', () => {
    cy.get('#favorite-tab').click();
    cy.get('#all-tab').click();

    cy.get('restaurant-item').should('have.length', restaurants.length);
  });
});
