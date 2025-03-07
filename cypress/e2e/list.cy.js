describe("list(ul) 태그 E2E 테스트", () => {
  it("list(ul) 태그가 렌더링이 되었는지 확인한다.", () => {
    cy.visit("http://localhost:5500");
    cy.get("ul").should("exist");
  });
});
