describe("음식점 필터링 및 정렬 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("필터 select 요소의 선택 값이 변경되면 UI에 반영되어야 한다.", () => {
    cy.get('[data-testid="category-filter"]').select("전체");
    cy.get('[data-testid="category-filter"]').should("have.value", "전체");

    cy.get('[data-testid="sorting"]').select("name");
    cy.get('[data-testid="sorting"]').should("have.value", "name");

    cy.get('[data-testid="sorting"]').select("distance");
    cy.get('[data-testid="sorting"]').should("have.value", "distance");
  });

  it("특정 카테고리 선택 시, UI에 해당 카테고리의 음식점만 표시되어야 한다.", () => {
    cy.get('[data-testid="category-filter"]').select("한식");

    cy.get('[data-testid="restaurant-list"]')
      .find('[data-testid="restaurant-category"]')
      .each(($el) => {
        cy.wrap($el).should("have.attr", "alt", "한식");
      });
  });

  it("정렬 옵션 변경 시 UI가 업데이트되어야 한다.", () => {
    cy.get('[data-testid="restaurant-list"]')
      .children()
      .then(($initialItems) => {
        cy.get('[data-testid="sorting"]').select("distance");

        cy.get('[data-testid="restaurant-list"]')
          .children()
          .should("have.length", $initialItems.length);
      });
  });
});
