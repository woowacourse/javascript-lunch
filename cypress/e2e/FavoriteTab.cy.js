describe("즐겨찾기 탭 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.get('[data-testid="list-tab"]').should("have.class", "active");
    cy.get('[data-testid="favorite-tab"]').should("not.have.class", "active");
  });

  it("즐겨찾기 아이콘 클릭 시 UI에서 아이콘이 토글되어야 한다.", () => {
    cy.get('[data-testid="restaurant-list"]')
      .find('[data-testid="favorite-icon"]')
      .first()
      .invoke("attr", "src")
      .then((srcBefore) => {
        const expectedIcon = srcBefore.includes("filled") ? "lined" : "filled";
        cy.get('[data-testid="restaurant-list"]')
          .find('[data-testid="favorite-icon"]')
          .first()
          .click();

        cy.get('[data-testid="restaurant-list"]')
          .find('[data-testid="favorite-icon"]')
          .first()
          .should("have.attr", "src")
          .and("include", expectedIcon);
      });
  });

  it("즐겨찾기 탭 내에서 즐겨찾기 아이콘 클릭 시 UI에서 아이콘이 토글되어야 한다.", () => {
    cy.get('[data-testid="favorite-tab"]').click();

    cy.get('[data-testid="restaurant-list"]')
      .find('[data-testid="favorite-icon"]')
      .first()
      .invoke("attr", "src")
      .then((srcBefore) => {
        const expectedIcon = srcBefore.includes("filled") ? "lined" : "filled";
        cy.get('[data-testid="restaurant-list"]')
          .find('[data-testid="favorite-icon"]')
          .first()
          .click();

        cy.get('[data-testid="restaurant-list"]')
          .find('[data-testid="favorite-icon"]')
          .first()
          .should("have.attr", "src")
          .and("include", expectedIcon);
      });
  });
});
