describe("Filter 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("카테고리 중 하나를 선택하면 해당하는 카테고리의 음식점만 표시된다.", () => {
    const selectedCategory = "한식";
    cy.get("select[id='category-filter']").select(selectedCategory);
    cy.get(".restaurant__category > img").should("have.attr", selectedCategory);
  });
});
