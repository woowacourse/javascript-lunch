describe("렌더링 테스트", () => {
  it("body 태그가 렌더링 되었는지 확인한다.", () => {
    cy.visit("http://localhost:5173");
    cy.get("body").should("exist");
  });
});
