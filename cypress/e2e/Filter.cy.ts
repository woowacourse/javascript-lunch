describe('필터링 작동 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('처음 홈페이지를 열면 카테고리 필터링이 렌더링된다.', () => {
    cy.get('.tab-menu').should('exist');
    const $categoryFilter = cy.get('#category-filter');
    $categoryFilter.should('exist');
  });

  it('처음 홈페이지를 열면 정렬 필터링이 렌더링된다.', () => {
    const $sortingFilter = cy.get('#sorting-filter');
    $sortingFilter.should('exist');
  });

  it('처음 홈페이지를 열면 전체 음식점이 이름순으로 정렬되어 있다', () => {
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
      isFavorite: true,
    };

    const NEW_RESTAURANT3 = {
      name: '구구당',
      category: '아시안',
      distance: '15',
      description: `홍콩식 음식이 맛있음!`,
      link: 'https://www.naver.com',
      isFavorite: true,
    };

    const restaurants = [NEW_RESTAURANT1, NEW_RESTAURANT2, NEW_RESTAURANT3];
    const sortedAllRestaurants = [NEW_RESTAURANT3, NEW_RESTAURANT1, NEW_RESTAURANT2].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
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

    cy.get('.restaurant').each(($restaurant, index) => {
      const restaurantName = $restaurant.find('.restaurant__name').text();
      expect(restaurantName).to.equal(sortedAllRestaurants[index].name);
    });
  });
});
