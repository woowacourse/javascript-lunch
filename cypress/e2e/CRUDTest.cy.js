describe("음식점 관리 기능 구현 테스트", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.addRestaurant("중식", "홍콩반점", "10", "", "");
  });

  it("음식점 추가 기능 구현 테스트", () => {
    cy.get("#홍콩반점").should("be.visible");
    cy.get(".restaurant-list")
      .find(".star-container")
      .find(".star-icon")
      .should("have.attr", "src")
      .and("include", "lined");
  });

  it("음식점 삭제 기능 구현 테스트", () => {
    cy.get("#홍콩반점").click();
    cy.get("#remove-button").click();
    cy.get("#홍콩반점").should("not.exist");
  });

  it("음식점 즐겨찾기 기능 구현 테스트", () => {
    cy.get("#홍콩반점").click();
    cy.findStarOnModal().should("have.attr", "src").and("include", "lined");
    cy.findStarOnModal().click();
    cy.findStarOnModal().should("have.attr", "src").and("include", "filled");
    cy.get(".restaurant-list")
      .find(".star-container")
      .find(".star-icon")
      .should("have.attr", "src")
      .and("include", "filled");
    cy.get("#quit-button").click();
    cy.get("#favorite-restaurants").click();
    cy.get("#홍콩반점").should("be.visible");
  });
});
