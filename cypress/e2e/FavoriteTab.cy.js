describe("즐겨찾기 탭에 대한 E2E 테스트", () => {
  let initialFavoritesCount = 0;
  let initialRestaurantCount = 0;

  beforeEach(() => {
    cy.visit("http://localhost:5173");

    cy.get('[data-testid="restaurant-list"]')
      .children()
      .then(($elements) => {
        initialFavoritesCount = Cypress.$($elements).filter((_, el) => {
          return (
            Cypress.$(el).find(
              "[data-testid='favorite-icon'][src$='favorite-icon-filled.png']"
            ).length > 0
          );
        }).length;
      });

    cy.get('[data-testid="restaurant-list"]')
      .children()
      .then(($elements) => {
        initialRestaurantCount = $elements.length;
      });

    cy.get('[data-testid="restaurant-list"]')
      .should("exist")
      .children()
      .should("have.length.greaterThan", 0);
  });

  it("isFavorite이 false인 음식점의 즐겨찾기 버튼을 클릭하면, 즐겨찾기 탭에서 보여진다.", () => {
    if (
      initialRestaurantCount === 0 ||
      initialRestaurantCount === initialFavoritesCount
    )
      return;

    cy.get('[data-testid="restaurant-list"]')
      .children()
      .then(($elements) => {
        const $notFavorite = Cypress.$($elements).filter((_, el) => {
          return (
            Cypress.$(el).find(
              "[data-testid='favorite-icon'][src$='favorite-icon-lined.png']"
            ).length > 0
          );
        });

        cy.wrap($notFavorite.first()).within(() => {
          cy.get('[data-testid="favorite-icon"]').click();
        });
      });

    cy.get('[data-testid="favorite-tab"]').click();

    cy.get('[data-testid="restaurant-list"]')
      .children()
      .should("have.length", initialFavoritesCount + 1);

    cy.get('[data-testid="favorite-icon"]').click();
  });

  it("음식점 상세 모달에서 isFavorite이 false인 음식점의 즐겨찾기 버튼을 클릭하면, 즐겨찾기 탭에서 보여진다.", () => {
    if (
      initialRestaurantCount === 0 ||
      initialRestaurantCount === initialFavoritesCount
    )
      return;

    cy.get('[data-testid="restaurant-list"]')
      .children()
      .then(($elements) => {
        const $notFavorite = Cypress.$($elements).filter((_, el) => {
          return (
            Cypress.$(el).find(
              "[data-testid='favorite-icon'][src$='favorite-icon-lined.png']"
            ).length > 0
          );
        });

        cy.wrap($notFavorite.first()).within(() => {
          cy.get(".restaurant__name").click();
        });
      });

    cy.get('[data-testid="favorite-button"]').click();
    cy.get('[data-testid="close-modal"]').click();
    cy.get('[data-testid="favorite-tab"]').click();

    cy.get('[data-testid="restaurant-list"]')
      .children()
      .should("have.length", initialFavoritesCount + 1);

    cy.get('[data-testid="favorite-icon"]').click();
  });

  it("즐겨찾기 탭에서 즐겨찾기 버튼을 클릭하면, 즐겨찾기 탭에서 사라진다.", () => {
    if (
      initialRestaurantCount === 0 ||
      initialRestaurantCount === initialFavoritesCount
    )
      return;

    cy.get('[data-testid="restaurant-list"]')
      .children()
      .then(($elements) => {
        const $notFavorite = Cypress.$($elements).filter((_, el) => {
          return (
            Cypress.$(el).find(
              "[data-testid='favorite-icon'][src$='favorite-icon-lined.png']"
            ).length > 0
          );
        });

        cy.wrap($notFavorite.first()).within(() => {
          cy.get('[data-testid="favorite-icon"]').click();
        });
      });

    cy.get('[data-testid="favorite-tab"]').click();

    cy.get('[data-testid="restaurant-list"]')
      .children()
      .first()
      .within(() => {
        cy.get('[data-testid="favorite-icon"]').click();
      });

    cy.get('[data-testid="restaurant-list"]')
      .children()
      .should("have.length", initialFavoritesCount);
  });
});
