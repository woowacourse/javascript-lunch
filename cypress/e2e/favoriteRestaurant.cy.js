describe("즐겨찾기 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("상세 정보에서 즐겨찾기 후 리스트에서 별이 채워져 있어야 한다", () => {
    cy.contains("피양콩할마니").click();

    cy.get('[data-testid="restaurant-info-modal"]').should("be.visible");

    cy.get('[data-testid="favorite-detail-button"]').click();

    cy.get('[data-testid="cancel-restaurant-info"]').click();

    cy.get('[data-testid="restaurant-list"]')
      .contains("피양콩할마니")
      .parent()
      .parent()
      .find('[data-testid="favorite-icon"]')
      .should("have.attr", "src", "/public/icons/favorite-icon-filled.png");
  });
});

describe("자주 가는 음식점 탭 확인 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("자주 가는 음식점 탭에 피양콩할마니가 추가되어 있어야 한다", () => {
    cy.get('[data-testid="restaurant-list"]')
      .contains("피양콩할마니")
      .parent()
      .parent()
      .find('[data-testid="favorite-icon"]')
      .click();

    cy.get('[data-testid="favorite-tab"]').click();

    cy.contains("피양콩할마니").should("be.visible");
  });
});

describe("즐겨찾기 취소 및 확인 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("자주 가는 탭에서 즐겨찾기 취소 후 모든 음식점 탭에서 확인", () => {
    cy.get('[data-testid="restaurant-list"]')
      .contains("피양콩할마니")
      .parent()
      .parent()
      .find('[data-testid="favorite-icon"]')
      .click();

    cy.get('[data-testid="favorite-tab"]').click();

    cy.get(".restaurant-list")
      .contains("피양콩할마니")
      .parent()
      .parent()
      .find('[data-testid="favorite-icon"]')
      .click();

    cy.get('[data-testid="all-tab"]').click();

    cy.get(".restaurant-list")
      .contains("피양콩할마니")
      .parent()
      .parent()
      .find('[data-testid="favorite-icon"]')
      .should("have.attr", "src", "/public/icons/favorite-icon-lined.png");
  });
});
