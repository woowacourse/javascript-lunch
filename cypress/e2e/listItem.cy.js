describe("list-item(li) 태그 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500");
  });

  it("list-item(li) 태그가 렌더링이 되었는지 확인한다.", () => {
    cy.get("li.restaurant").should("exist");
  });
});
