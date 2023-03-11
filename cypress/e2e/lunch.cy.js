describe("lunch e2e test", () => {
  before(() => {
    cy.visit("http://localhost:8080/");
    cy.viewport(500, 850);
  });

  it("식당 정보를 입력하면 목록에 추가된다", () => {
    cy.get(".gnb__button").click();

    cy.get("#category").select("한식");
    cy.get("#name").type("김치찜");
    cy.get("#takingTime").select("5");
    cy.get("#description").type("맛있는 김치찜. 추천합니다.");

    cy.get(".modal--submit").click();

    cy.contains("김치찜");
  });
});
