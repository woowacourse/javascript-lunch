describe("레스토랑 정보 입력하는 모달에 대한 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");

    cy.get('[data-testid="open-add-restaurant-modal-button"]')
      .should("exist")
      .click();

    cy.get('[data-testid="modal"]').should("exist");
  });

  it("레스토랑 정보 입력하는 모달을 열고 모달의 backdrop을 클릭하여 닫을 수 있다.", () => {
    cy.get('[data-testid="modal-backdrop"]').click(0, 0);

    cy.get('[data-testid="modal"]').should("not.exist");
  });

  it("레스토랑 정보 입력하는 모달을 열고 모달의 취소하기 버튼을 클릭하여 닫을 수 있다.", () => {
    cy.get('[data-testid="cancel-add-restaurant-form"]').click();

    cy.get('[data-testid="modal"]').should("not.exist");
  });
});
