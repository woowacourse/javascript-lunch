describe("DetailModal 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get(".restaurant").eq(0).click();
  });

  it("LunchInfoCard를 누르면 DetailModal 창이 열린다.", () => {
    cy.get(".modal[id=detail] .modal-container").should("be.visible");
  });

  it("DetailModal 창에서 닫기 버튼을 누르면 DetailModal 창이 닫힌다.", () => {
    cy.get("#close__button").click();
    cy.get(".modal[id=detail] .modal-container").should("not.be.visible");
  });

  it("DetailModal 창에서 삭제 버튼을 누르면 해당하는 음식점이 삭제된다.", () => {
    cy.get("#delete__button").click();
    cy.get(".modal[id=detail] .modal-container").should("not.be.visible");
    cy.get(".restaurant-list").should("not.contain.text", "피양콩할마니");
  });

  it("DetailModal 창에서 즐겨찾기 버튼을 누르면 해당하는 음식점이 즐겨찾기에 추가된다.", () => {
    cy.get(".restaurant-detail .restaurant__favorite").click();
    cy.get("#close__button").click();
    cy.get(".favorite_restaurant_nav").click();
    cy.get(".restaurant-list").should("contain.text", "피양콩할마니");
  });
});
