describe("바텀 시트 닫는 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5174/");
    cy.viewport(1536, 960);
  });

  it("바텀 시트의 '취소하기' 버튼을 클릭했을 때 바텀 시트가 닫힌다.", () => {
    cy.get(".gnb__button").click();
    cy.contains("button", "취소하기").should("exist").and("be.visible").click();
    cy.get(".modal").should("not.have.class", "modal--open");
  });

  it("바텀 시트의 백드롭 화면을 클릭했을 때 바텀 시트가 닫힌다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal-backdrop").click({ force: true });
    cy.get(".modal").should("not.have.class", "modal--open");
  });
});
