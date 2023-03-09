describe("template spec", () => {
  it("음식점 추가기능 구현 테스트", () => {
    cy.visit("http://localhost:8080/");
    cy.get(".gnb__button").click();
    cy.get("#category").select("중식");
    cy.get("#name").type("홍콩반점");
    cy.get("#distance").select("10");
    cy.get("#add-button").click();
  });

  it("음식점 삭제기능 구햔 테스트", () => {
    cy.visit("http://localhost:8080/");

    cy.visit("http://localhost:8080/");
    cy.get(".gnb__button").click();
    cy.get("#category").select("중식");
    cy.get("#name").type("홍콩반점");
    cy.get("#distance").select("10");
    cy.get("#add-button").click();

    cy.get("#홍콩반점").click();
    cy.get("#remove-button").click();
  });
});
