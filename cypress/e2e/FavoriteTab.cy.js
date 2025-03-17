describe("UI 테스트 - 즐겨찾기 탭", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.get('[data-testid="list-tab"]').should("have.class", "active");
    cy.get('[data-testid="favorite-tab"]').should("not.have.class", "active");
  });

  it("즐겨찾기 아이콘 클릭 시 UI에서 아이콘이 토글되어야 함", () => {
    cy.get('[data-testid="restaurant-list"]')
      .find('[data-testid="favorite-icon"]')
      .first()
      .invoke("attr", "src")
      .then((srcBefore) => {
        const expectedIcon = srcBefore.includes("filled") ? "lined" : "filled";
        // 클릭 후 새롭게 요소를 재조회함
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

  it("즐겨찾기 탭 클릭 시 UI에서 탭 활성화가 변경되어야 함", () => {
    cy.get('[data-testid="favorite-tab"]').click();

    cy.get('[data-testid="favorite-tab"]').should("have.class", "active");
    cy.get('[data-testid="list-tab"]').should("not.have.class", "active");
  });

  it("즐겨찾기 탭 내에서 즐겨찾기 아이콘 클릭 시 UI에서 아이콘이 토글되어야 함", () => {
    cy.get('[data-testid="favorite-tab"]').click();

    // 즐겨찾기 탭 내 첫 번째 아이콘의 초기 상태에 따라 토글 테스트
    cy.get('[data-testid="restaurant-list"]')
      .find('[data-testid="favorite-icon"]')
      .first()
      .invoke("attr", "src")
      .then((srcBefore) => {
        const expectedIcon = srcBefore.includes("filled") ? "lined" : "filled";
        // 클릭 후 새롭게 요소를 재조회함
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
