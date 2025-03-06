describe("modal E2E 테스트", () => {
  it("select-form 태그가 있는지 확인한다.", () => {
    cy.visit("http://localhost:5500");
    cy.get(".form-item select").should("exist");
  });

  it("input-form 태그가 있는지 확인한다.", () => {
    cy.visit("http://localhost:5500");
    cy.get(".form-item input").should("exist");
  });

  it("textarea-form 태그가 있는지 확인한다.", () => {
    cy.visit("http://localhost:5500");
    cy.get(".form-item textarea").should("exist");
  });

  it("button-form 태그가 있는지 확인한다.", () => {
    cy.visit("http://localhost:5500");
    cy.get("form button").should("exist");
  });
});
