describe("delete 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("레스토랑을 삭제할수 있어야 한다.", () => {
    cy.get("#피양콩할마니").click();
    cy.get("#delete-button").click();
    cy.get(".restaurant").should("have.length", 9);
    cy.get(".restaurant:first-child").contains("친친");

    cy.get(".toast")
      .should("be.visible")
      .should("contain", "피양콩할마니 레스토랑을 삭제했습니다.");
  });
});
