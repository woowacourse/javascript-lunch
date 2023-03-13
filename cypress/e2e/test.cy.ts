describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    cy.viewport(500, 1000);
    cy.get(".gnb__button").click();
    cy.get("select#category").select("한식");
    cy.get("input#name").type("진대감");
    cy.get("select#distance").select("5");
    cy.get(".button--primary").click();
  });

  it("음식점을 추가하고 추가한 음식점이 화면에 출력된다.", () => {
    cy.get("ul.restaurant-list").children().should("contain.text", "진대감");
  });

  it("음식점 상세정보를 확인하기 위해 음식점을 클릭하고 삭제하기 버튼을 누른다.", () => {
    cy.contains("진대감").click();
    cy.get(".restaurant-detail").contains("진대감");
    cy.get(".remove-button").click();
    cy.get("ul.restaurant-list").children().should("have.length", 0);
  });

  it("즐겨찾기에 추가한 뒤 즐겨찾기 목록에서 확인-제거하고, 모든 음식점 메뉴에서 음식점이 남아있는지 확인한다.", () => {
    cy.get(".favorite").click();
    cy.get(".tab-menu").eq(1).click();
    cy.get(".favorite-list").children().should("contain.text", "진대감");
    cy.get(".favorite-list .favorite").click();
    cy.get("ul.favorite-list").children().should("have.length", 0);
    cy.get(".tab-menu").eq(0).click();
    cy.get(".restaurant-list").children().should("contain.text", "진대감");
  });
});
