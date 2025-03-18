describe("음식점 상세 정보 모달에 대한 E2E 테스트", () => {
  let initialRestaurantCount = 0;

  beforeEach(() => {
    cy.visit("http://localhost:5173");

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

  it("음식점 목록에서 음식점을 클릭하면, 음식점 상세 정보 모달이 보여진다.", () => {
    cy.get('[data-testid="restaurant-list"]').children().first().click();
    cy.get('[data-testid="modal"]').should("exist");
  });

  it("모달의 backdrop을 클릭하여 닫을 수 있다.", () => {
    cy.get('[data-testid="restaurant-list"]').children().first().click();
    cy.get('[data-testid="modal-backdrop"]').click(0, 0);
    cy.get('[data-testid="modal"]').should("not.exist");
  });

  it("모달의 닫기 버튼을 클릭하여 닫을 수 있다.", () => {
    cy.get('[data-testid="restaurant-list"]').children().first().click();
    cy.get('[data-testid="close-modal"]').click();
    cy.get('[data-testid="modal"]').should("not.exist");
  });

  it("모달의 삭제하기 버튼을 클릭하여 음식점 정보를 삭제할 수 있다.", () => {
    if (initialRestaurantCount === 0) return;

    cy.get('[data-testid="restaurant-list"]')
      .children()
      .first()
      .invoke("attr", "data-id")
      .then((deletedRestaurantId) => {
        cy.get('[data-testid="restaurant-list"]').children().first().click();

        cy.get('[data-testid="delete-restaurant"]').click();

        cy.get('[data-testid="modal"]').should("not.exist");

        cy.get('[data-testid="restaurant-list"]')
          .children()
          .should("have.length", initialRestaurantCount - 1);

        cy.get('[data-testid="restaurant-list"]')
          .children()
          .should("not.have.attr", "data-id", deletedRestaurantId);
      });
  });
});
