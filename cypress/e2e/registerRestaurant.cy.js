describe("정상적으로 음식점을 등록한다.", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.viewport(1280, 720);
  });

  it("정상적으로 음식점을 등록한다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal-container").should("be.visible");
    cy.get("#category").select("한식");
    cy.get("#name").type("더휴");
    cy.get("#distance").select("5분 내");
    cy.get("#description").type("이집맛집임");
    cy.get("#link").type("링크임");

    cy.get(".button--primary").click();
    cy.get(".modal-container").should("not.exist");
    cy.get("body").contains("더휴");
  });
});
