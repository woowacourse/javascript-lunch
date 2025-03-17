describe("favorite 버튼 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("List 중, 첫번째 listItem의 좋아요를 누르면 좋아요가 반영된다.", () => {
    cy.get("li.restaurant .favorite-star")
      .first()
      .should("not.have.class", "active")
      // 클릭 후
      .click()
      .should("have.class", "active");
  });

  it("List 중, 첫번째 listItem의 좋아요가 새로고침 후에도 유지되는지 확인한다.", () => {
    cy.get("li.restaurant .favorite-star")
      .first()
      .should("not.have.class", "active")
      // 클릭 후
      .click()
      .should("have.class", "active");

    // 새로고침 후에도 좋아요 상태 유지 확인
    cy.reload();
    cy.get("li.restaurant .favorite-star").first().should("have.class", "active");
  });

  it("List 중, 첫번째 listItem의 좋아요를 누른 후, 자주가는 음식점 탭에 추가되는지 확인한다.", () => {
    cy.get("li.restaurant .favorite-star").first().click().should("have.class", "active");

    // 첫 번째 음식점의 이름 가져오기
    cy.get("li.restaurant").first().find(".restaurant__name").invoke("text").as("favoriteRestaurantName");

    cy.get(".restaurant-tab#favorite-restaurant").click();

    // 자주 가는 음식점 탭에 해당 음식점이 존재하는지 확인
    cy.get("@favoriteRestaurantName").then((restaurantName) => {
      cy.get(".favorite-restaurant-list-container li.restaurant").should("contain.text", restaurantName.trim());
    });
  });
});
