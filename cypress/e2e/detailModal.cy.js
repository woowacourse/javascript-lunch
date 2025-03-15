describe("DetailModal 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get(".restaurant").eq(0).click();
  });

  it("LunchInfoCard를 누르면 DetailModal 창이 열린다.", () => {
    cy.get(".modal[id=detail] .modal-container").should("be.visible");
  });
});
