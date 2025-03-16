describe("음식점 목록 filter 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Tab 하단 오른쪽에 위치하는 Select를 클릭하면 카테고리 DropDown 목록이 존재하고, 한식을 클릭할 경우 한식 카테고리를 가진 아이템만 노출시킨다.", () => {
    cy.get("#category-filter-select").click();

    cy.get("#category-filter-select-dropdown li[data-value='한식']").click();

    cy.get("#restaurant-list").within(() => {
      cy.get("#lunch-item-1").should("exist");
      cy.get("#lunch-item-1").contains("한식당").should("exist");
    });
  });

  it("Tab 하단 왼쪽에 위치하는 Select를 클릭하면 이름/거리에 관한 DropDown 목록이 존재하고, 거리를 클릭할 경우 거리가 가까운 순으로 아이템을 노출시킨다.", () => {
    cy.get("#name-distance-filter-select").click();

    cy.get(
      "#name-distance-filter-select-dropdown li[data-value='거리순']"
    ).click();

    cy.get("#restaurant-list").children().eq(0).contains("한식당");
  });
});
