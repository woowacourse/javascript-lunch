describe("UI 테스트 - 음식점 필터링 및 정렬", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("필터 select 요소의 선택 값이 변경되면 UI에 반영되어야 함", () => {
    // 카테고리 select: '전체' 선택 후 값 확인
    cy.get('[data-testid="category-filter"]').select("전체");
    cy.get('[data-testid="category-filter"]').should("have.value", "전체");

    // 정렬 select: 'name' 선택 후 값 확인
    cy.get('[data-testid="sorting"]').select("name");
    cy.get('[data-testid="sorting"]').should("have.value", "name");

    // 정렬 select: 'distance' 선택 후 값 확인
    cy.get('[data-testid="sorting"]').select("distance");
    cy.get('[data-testid="sorting"]').should("have.value", "distance");
  });

  it("특정 카테고리 선택 시, UI에 해당 카테고리의 음식점만 표시되어야 함", () => {
    // 예를 들어 '한식' 선택
    cy.get('[data-testid="category-filter"]').select("한식");

    // 표시된 음식점의 카테고리 아이콘 alt 속성이 모두 '한식'이어야 함
    cy.get('[data-testid="restaurant-list"]')
      .find('[data-testid="restaurant-category"]')
      .each(($el) => {
        cy.wrap($el).should("have.attr", "alt", "한식");
      });
  });

  it("정렬 옵션 변경 시 UI가 업데이트되어야 함", () => {
    // 초기 음식점 목록의 DOM 요소 수 확인
    cy.get('[data-testid="restaurant-list"]')
      .children()
      .then(($initialItems) => {
        // 정렬 옵션을 변경
        cy.get('[data-testid="sorting"]').select("distance");

        // UI가 재렌더링 되어 동일한 수의 아이템을 보여줘야 함
        cy.get('[data-testid="restaurant-list"]')
          .children()
          .should("have.length", $initialItems.length);
      });
  });
});
