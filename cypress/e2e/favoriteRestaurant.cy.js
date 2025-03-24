// cypress/integration/favorite_button_spec.js

describe("즐겨찾기 버튼 기능 테스트", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:5173/");
  });

  it("즐겨찾기 버튼 클릭 시 아이콘이 변경되어야 한다", () => {
    cy.get(".restaurant")
      .first()
      .find(".favorite-icon")
      .should("have.attr", "alt", "empty-star")
      .should("have.attr", "src", "./favorite-icon-lined.png");

    cy.get(".restaurant").first().find(".favorite_add_button").click();

    cy.get(".restaurant")
      .first()
      .find(".favorite-icon")
      .should("have.attr", "alt", "filled-star")
      .should("have.attr", "src", "./favorite-icon-filled.png");
  });

  it("즐겨찾기된 레스토랑이 즐겨찾기 탭에 표시되어야 한다", () => {
    cy.get(".restaurant").first().find(".favorite_add_button").click();

    cy.get(".tab-container").contains("자주 가는 음식점").click();

    cy.get(".restaurant").should("have.length", 1);
  });

  it("즐겨찾기 해제하면 즐겨찾기 목록에서 제거되어야 한다", () => {
    cy.get(".restaurant").first().find(".favorite_add_button").click();

    cy.get(".tab-container").contains("자주 가는 음식점").click();

    cy.get(".restaurant").should("have.length", 1);

    cy.get(".restaurant").first().find(".favorite_add_button").click();

    cy.get(".restaurant").should("not.exist");
  });

  it("페이지 새로고침 후에도 즐겨찾기 상태가 유지되어야 한다", () => {
    cy.get(".restaurant").first().find(".favorite_add_button").click();

    cy.reload();

    cy.get(".restaurant")
      .first()
      .find(".favorite-icon")
      .should("have.attr", "alt", "filled-star");

    cy.get(".tab-container").contains("자주 가는 음식점").click();

    cy.get(".restaurant").should("have.length", 1);
  });

  it("여러 레스토랑을 즐겨찾기하고 해제할 수 있어야 한다", () => {
    cy.get(".restaurant").eq(0).find(".favorite_add_button").click();

    cy.get(".restaurant").eq(1).find(".favorite_add_button").click();

    cy.get(".tab-container").contains("자주 가는 음식점").click();

    cy.get(".restaurant").should("have.length", 2);

    cy.get(".restaurant").eq(0).find(".favorite_add_button").click();

    cy.get(".restaurant").should("have.length", 1);
  });
});
