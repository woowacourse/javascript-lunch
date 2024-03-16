describe('탭과 필터링 동시 동작 테스트', () => {
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

  it('카테고리 필터링(중식)이 적용된 상태에서 모든 음식점 탭을 클릭해도 필터가 유지되어 필터된 음식점만 나온다.', () => {
    cy.get('#category-filter').select('중식');
    cy.get('#all-tab').click();
    cy.get('.restaurant__name').should('contain.text', NEW_RESTAURANT2.name);
    cy.get('.restaurant__name').should('contain.not.text', NEW_RESTAURANT1.name);
    cy.get('.restaurant__name').should('contain.not.text', NEW_RESTAURANT3.name);
  });

  it('거리순 필터링이 적용된 상태에서 자주 가는 음식점 탭을 클릭해도 필터링이 유지되어 필터링된 음식점이 나온다.', () => {
    cy.get('.favorite-button').first().click();
    cy.get('.favorite-button').eq(2).click();

    cy.get('#sorting-filter').select('거리순');
    cy.get('#favorite-tab').click();

    const sortedFavoriteRestaurant = restaurants.sort((a, b) => {
      return Number(a.distance) - Number(b.distance);
    });

    cy.get('.restaurant').each(($restaurant, index) => {
      const restaurantName = $restaurant.find('.restaurant__name').text();
      expect(restaurantName).to.equal(sortedFavoriteRestaurant[index].name);
    });
  });
});
