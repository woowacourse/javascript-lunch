describe("새로고침하면 데이터가 초기화된다.", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.viewport(1280, 720);
  });

  it("사용자가 목록에 음식점을 등록하고 새로고침을 하면 데이터가 초기 값으로 돌아간다.", () => {
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

    cy.reload();

    cy.get("body").should("not.contain", "더휴");
  });
});
