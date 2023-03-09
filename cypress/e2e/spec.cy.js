describe("음식점 관리 기능 구현 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    cy.get(".gnb__button").click();
    cy.get("#category").select("중식");
    cy.get("#name").type("홍콩반점");
    cy.get("#distance").select("10");
    cy.get("#add-button").click();
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
    cy.get(".modal").find(".star-container").find(".star-icon").should("have.attr", "src").and("include", "lined");
    cy.get(".modal").find(".star-container").find(".star-icon").click();
    cy.get(".modal").find(".star-container").find(".star-icon").should("have.attr", "src").and("include", "filled");
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
