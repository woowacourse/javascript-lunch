it("음식점 추가 기능 구현 테스트", () => {
  cy.visit("http://localhost:8080/");
  cy.get(".gnb__button").click();
  cy.get("#category").select("중식");
  cy.get("#name").type("친친");
  cy.get("#distance").select("10");
  cy.get("form").submit();
  cy.get('.restaurant[name="친친"]').should("be.visible");
});

it("음식점 즐겨찾기 기능 구현 테스트", () => {
  cy.visit("http://localhost:8080/");
  cy.get(".gnb__button").click();
  cy.get("#category").select("중식");
  cy.get("#name").type("친친");
  cy.get("#distance").select("10");
  cy.get("form").submit();
  cy.get('.restaurant[name="친친"]')
    .find('button[is="favorite-button"]')
    .click()
    .find("img")
    .should(
      "have.attr",
      "src",
      "http://localhost:8080/favorite-icon-filled.png"
    );
});
