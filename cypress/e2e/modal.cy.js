describe("modal E2E 테스트", () => {
  it("select-form(.form-item) 태그가 있는지 확인한다.", () => {
    cy.visit("http://localhost:5500");
    cy.get(".form-item #category").should("exist");
  });
});
