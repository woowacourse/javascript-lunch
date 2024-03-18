describe('메인 페이지 탭 컴포넌트에 관한 테스트', () => {
  beforeEach(() => {
    cy.visitMainPage();
  });
  it('모든 음식점 탭을 클릭하면 카테고리와 거리순 or 이름순을 고를 수 있는 셀렉트 태그가 있다', () => {
    cy.get('#allRestaurantTabButton').click();

    cy.get('main .restaurant-filter-container').should('exist');
  });

  it('자주 가는 음식점 탭을 클릭하면 카테고리와 거리순 or 이름순을 고를 수 있는 셀렉트 태그가 사라진다', () => {
    cy.get('#favoriteRestaurantTabButton').click();

    cy.get('main .restaurant-filter-container').should('not.exist');
  });
});
