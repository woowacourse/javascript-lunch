describe("상단 navigation 버튼 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("상단 navigation 버튼을 누르면 해당하는 버튼의 텍스트가 강조된다.", () => {
    cy.get(".favorite_restaurant_nav")
      .click()
      .should("have.class", "activated");
  });

  it("자주 가는 음식점 navigation 버튼을 누르면 자주 가는 음식점 목록이 화면에 표시된다.", () => {
    cy.get(".restaurant__favorite[id=0]").click();
    cy.get(".favorite_restaurant_nav").click();
    cy.get(".restaurant-filter-container").should("not.be.visible");
    cy.get(".restaurant-list-container").should("not.be.visible");
    cy.get(".favorite-list-container").should("be.visible");
  });

  it("모든 음식점 navigation 버튼을 누르면 모든 음식점 목록이 화면에 표시된다.", () => {
    cy.get(".favorite_restaurant_nav").click();
    cy.get(".all_restaurant_nav").click();
    cy.get(".restaurant-filter-container").should("be.visible");
    cy.get(".restaurant-list-container").should("be.visible");
    cy.get(".favorite-list-container").should("not.be.visible");
  });
});
